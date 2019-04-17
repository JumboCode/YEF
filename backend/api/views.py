from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from api.models import Team, Tournament, Round, MemberPoint, JudgePoint, MatchUp, Judge, Member, Club
from api.serializers import UserSerializer, GroupSerializer, TeamSerializer, TournamentSerializer, TeamsInTournamentSerializer, RoundSerializer, MemberPointSerializer, JudgePointSerializer, MatchUpSerializer, JudgeSerializer, MemberSerializer, ClubSerializer
import json
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.http import JsonResponse, HttpRequest

# from django.core.exceptions import ObjectDoesNotExist

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class TeamViewSet(viewsets.ModelViewSet):
    #authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer#Team.objects.all()
    #serializer_class = TournamentSerializer
    """def list(self, request):
        queryset = Tournament.objects.all()#Team.objects.all()
        serializer = TournamentSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Tournament.objects.all()
        tournament = get_object_or_404(queryset, pk=pk)
        serializer = TeamsInTournamentSerializer(tournament)
        return Response(serializer.data)"""

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })

class RoundViewSet(viewsets.ModelViewSet):
    queryset = Round.objects.all()
    serializer_class = RoundSerializer

class MemberPointViewSet(viewsets.ModelViewSet):
    queryset = MemberPoint.objects.all()
    serializer_class = MemberPointSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class JudgePointViewSet(viewsets.ModelViewSet):
    queryset = JudgePoint.objects.all()
    serializer_class = JudgePointSerializer

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

class JudgeViewSet(viewsets.ModelViewSet):
    queryset = Judge.objects.all()
    serializer_class = JudgeSerializer

class MatchUpViewSet(viewsets.ModelViewSet):
    queryset = MatchUp.objects.all()
    serializer_class = MatchUpSerializer

class Tournament_Matchups(APIView):
    #authentication_classes = (authentication.BasicAuthentication,authentication.SessionAuthentication)
    #permission_classes = (permissions.IsAuthenticated,)

    def alterMatchups(self, club_teams, matched_teams, ct_length):
        counter = 0
        club_id = club_teams[0][1]
        inner_flag, different_teams = True, True
        mt_length = len(matched_teams)


        while(len(club_teams) > 2 and counter < mt_length): 
            different_teams = True
            while(inner_flag):    
                team_pair = matched_teams[counter]
                counter += 1
                club_ids = [team[1] for team in team_pair["matchup_teams"]]
                inner_flag &= club_ids[0] != club_id and club_ids[1] != club_id
                different_teams &= club_ids[0] != club_id and club_ids[1] != club_id
                inner_flag &= counter == mt_length
            
            if (different_teams):
                matched_teams.remove(team_pair)
                matched_teams.append({"matchup_teams": [club_teams.pop(), team_pair[0]]})
                matched_teams.append({"matchup_teams": [club_teams.pop(), team_pair[1]]})
        
        swing_matchups = [ {"matchup_teams": [team, ("swing_team", None)]} for team in club_teams ]
        matched_teams.extend(swing_matchups)       

    def createMatchups(self, matched_teams, teamlist):
        buffer_teams, skipped_team = (0, 0)
        last_clubid = None
        len_teams = len(teamlist)
        pair = []

        while(skipped_team < (len_teams - 1) ):
            for key, value in teamlist.items():
                skipped_team += 1
                if (value != []):
                    last_clubid = key
                    pair.append(value.pop())
                    buffer_teams += 1
                    skipped_team -= 1

                if(buffer_teams % 2 == 0):
                    matched_teams.append({"matchup_teams": pair})
                    pair = []
 
        teamlist[last_clubid].extend(pair)
        if(teamlist[last_clubid] != []):
            self.alterMatchups(teamlist[last_clubid], matched_teams, len_teams)

    def addJudges(self, matched_teams, judgelist):
        counter = 0
        len_teams = len(matched_teams)
        len_judges = len(judgelist)
        while(counter < len_teams and counter < len_judges):
            matched_teams[counter]["judge"] = judgelist[counter]
            counter += 1
    
    def entities_sameTournament(self, t_id):
        teams = Team.objects.all()
        teamlist = TeamSerializer(teams, many=True)
       
        judges = Judge.objects.all()
        judgelist = JudgeSerializer(judges, many=True)

        print(teamlist.data)
        matchup_judges, matchup_teams = ([], {})
        for team in teamlist.data:
            tournament_id = list(team.items())[3][1]
            club_id = list(team.items())[2][1]
            if(tournament_id == t_id): 
                if(club_id in matchup_teams):
                    matchup_teams[club_id].append((team, club_id))
                else:
                    matchup_teams[club_id]= [(team, club_id)]

        for judge in judgelist.data:
            tournament_id = list(judge.items())[1][1]
            club_id = list(judge.items())[2][1]
            if(tournament_id == t_id):
                matchup_judges.append((judge, club_id))
        return (matchup_teams, matchup_judges)

    def get(self, request, t_id, r_id):
        rounds = Round.objects.all()
        roundlist = RoundSerializer(rounds, many=True)
        (teamlist, judgelist) = self.entities_sameTournament(t_id)

        matchups = []
        self.createMatchups(matchups, teamlist)
        self.addJudges(matchups, judgelist)
        statement = [list(r.items())[2][1] for r in roundlist.data if (list(r.items())[1][1] == t_id and list(r.items())[0][1] == r_id)][0]
        return Response(
        {"matchups" : matchups,
         "statement": statement
        })

     #doesn't work when the there are people of same name from a team!
    def addMemberPoints(self, team_points, r_id, teams):
        len_teamPoints = len(team_points)
        for counter in range(0, len_teamPoints):
            member_names = list(team_points[counter].keys())
            teamID = teams[counter]
            for name in member_names:
                memberPoint = MemberPoint()
                memberPoint.roundID = r_id
                memberPoint.StylePoints = member_names[name][0]
                memberPoint.ContentPoints = member_names[name][1]
                memberPoint.StratergyPoints = member_names[name][2]
                memberPoint.memberID = Member.objects.filter(Q(teamID__pk=teamID) & Q(name__contains = name))
                memberPoint.save()
       
    
    def addJudgePoints(self, judge_points, r_id):
        judgePoint = JudgePoint()
        judgePoint.points = judge_points.points
        judge_points.roundID = r_id
        judge_points.judgeID = judge_points.judgeID
        judge_points.save()
    
    def post(self, request, t_id, r_id):
        if(request):
            data = json.loads(request.body)
            matchup = data["round_points"]
            for matchup_points in matchup:
                team_points = matchup_points["team_points"]
                judge_points = matchup_points["judge_points"]
                teams = matchup_points["teams"]
                self.addMemberPoints(team_points, r_id, teams)
                self.addJudgePoints(judge_points, r_id)
            return Response({"status": "success"})
        else:
            return Response({"status": "failed"}) 

# createTeam route view
class AddTeam(APIView):
    permission_classes = (IsAuthenticated,)
    def create_team(self, team_name, team_city, club_id, tournament_id):
        new_team = Team.objects.create(name=team_name, city=team_city, clubID=club_id, tournamentID=tournament_id)
        return new_team

    def create_member(self, member_name, member_team, member_club):
        return Member.objects.create(name=member_name, teamID=member_team, clubID=member_club)

    def post(self, request): 
        data = request.data
        club_name = data["club_name"]
        club, created = Club.objects.get_or_create(name=club_name)
        tournament = Tournament.objects.get(id=data["tournamentID"])
        team = Team.objects.create(name=data["name"], city=data["city"], clubID=club, tournamentID=tournament)
        for name in data["member_names"]:
            self.create_member(name, team, club)
        return Response(TeamSerializer(team).data, status=status.HTTP_201_CREATED)

# SCHEME for frontend: for json body:
# "name": "NAME"
# "city": "CITY"
# "club_name": "CLUB_NAME"
# "member_names": ['MEMBER1', 'MEMBER2', 'MEMBER3', ..., 'MEMBERN']
# "tournamentID": (int -> tournament id from database)

class AuthenticateUser(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.get(username=data['username'])
        except:
            return Response(None, status.HTTP_404_NOT_FOUND)
        user = authenticate(username=data['username'],password=data['password'])
        if user is not None:
            serializer_context = {'request': request}
            serialized_user = UserSerializer(instance=user, context=serializer_context)
            serialized_user.data['auth_token'] = user.auth_token
            user_dict = serialized_user.data
            user_dict['token'] = user.auth_token.key
            return Response(user_dict, status=status.HTTP_200_OK)
        else:
            return Response(None, status.HTTP_404_NOT_FOUND)



# class idea: AddMember API that simply adds team members to an existing team
# class idea: Find tournamentID given a tournament name to help frontend out
                