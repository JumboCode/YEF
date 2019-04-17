from django.shortcuts import render
from django.contrib.auth.models import User, Group
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
from pprint import pprint
import math
import random

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class TeamViewSet(viewsets.ModelViewSet):
    #authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)
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

    def randomizeTeams(self, teamlist):
        for team in teamlist:
            random.shuffle(teamlist[team])

    def leastConstraintJudge(self, judgelist, judge_constraints):
        smallest = 54762489730469
        least_constrainted_judge = None
        for judge in judgelist:
            current_constraint = judge_constraints[judge[0]['id']]
            if current_constraint < smallest:
                least_constrainted_judge = judge
                smallest = current_constraint
        return least_constrainted_judge

    def createRoundMatchups(self, matchup_pairs, teamlist):
        self.randomizeTeams(teamlist)
        dict_list = []  #converting dictionaries to a list with teams of same club grouped together
        for key, value in teamlist.items():
            dict_list.extend(value)
        side_bracket = math.ceil(len(dict_list) /2)
        
        i = 0 #creating matchups
        for club in dict_list:
            if(i < side_bracket):
                matchup_pairs.append({"pair" : [club]} )     
            else:
                matchup_pairs[i - side_bracket]["pair"].append(club)
            i += 1
        if(len(dict_list) - 2*side_bracket != 0):
            matchup_pairs[side_bracket - 1]["pair"].append([{ "name": "Swing Team", "club_name":None}, "None"])
    
    def addJudges(self, matched_teams, judgelist):
        judge_constraints = {} #contains judge with the number of teams it can judge
        for judge in judgelist:
            judge_constraints[judge[0]['id']] = 0

        matched_team_judges = [] #contains the judges that can judge a team
        for teams in matched_teams:
            matched_team_judges.append([])
            side1 = teams["pair"][0][1]
            side2 = teams["pair"][1][1]
            for judge in judgelist:
                judge_id = judge[1]
                if( judge_id != side1 and judge_id != side2):
                    judge_constraints[judge[0]['id']] += 1
                    matched_team_judges[-1].append(judge)
        
        matched_team_judges.sort(key=lambda t: len(t), reverse=False)
        i = 0
        while( i < len(matched_team_judges)):
            judgelist = matched_team_judges[i]
            judge = self.leastConstraintJudge(judgelist, judge_constraints)
            matched_teams[i]["judge"] = judge
            for matched_team in matched_team_judges:
                if judge in matched_team:
                    matched_team.remove(judge)
            matched_team_judges.sort(key=lambda t: len(t), reverse=False)
            i += 1

    def entities_sameTournament(self, t_id):
        teams = Team.objects.all()
        teamlist = TeamSerializer(teams, many=True)

        judges = Judge.objects.all()
        judgelist = JudgeSerializer(judges, many=True)

        matchup_judges, matchup_teams = ([], {})
        for team in teamlist.data:
            tournament_id = team["tournamentID"]
            club_name = team["club_name"]
            if(tournament_id == t_id):
                if(club_name in matchup_teams):
                    matchup_teams[club_name].append((team, club_name))
                else:
                    matchup_teams[club_name] = [(team, club_name)]

        for judge in judgelist.data:
            tournament_id = judge["tournamentID"]
            club_name = judge["club_name"]
            if(tournament_id == t_id):
                matchup_judges.append((judge, club_name))
        return (matchup_teams, matchup_judges)

    def addMatchups(self, matchups, r_id):
        for pairs in matchups:
            matchup = MatchUp()
            matchup.roundID = r_id
            matchup.judgeID = pairs["judge"][0].get("id")
            matchup.oppID = pairs["pair"][0][0].get("id")
            matchup.propID = pairs["pair"][1][0].get("id")
            matchup.save()

    def get(self, request, t_id, r_id):
        rounds = Round.objects.all()
        roundlist = RoundSerializer(rounds, many=True)
        (teamlist, judgelist) = self.entities_sameTournament(t_id)

        matchups = []
        self.createRoundMatchups(matchups, teamlist)
        self.addJudges(matchups, judgelist)
        #self.addMatchups(matchups, r_id)
        statement = [list(r.items())[2][1] for r in roundlist.data if (list(r.items())[1][1] == t_id and list(r.items())[0][1] == r_id)][0]
        
        return Response(  {"matchups" : matchups,
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
    
    def update_matchup_win(self, teams, r_id, team_points ):
        propTeamID = teams[0]
        oppTeamID = teams[1]
        propTeam = list(team_points[0].keys())
        oppTeam = list(team_points[1].keys())
        points_opp = 0
        points_prop = 0
        for member in propTeam:
            points_prop += propTeam[member][0]
            points_prop += propTeam[member][1]
            points_prop += propTeam[member][2]
        for member in oppTeam:
            points_opp += oppTeam[member][0]
            points_opp += oppTeam[member][1]
            points_opp += oppTeam[member][2]
        matchup = MatchUp.objects.filter(Q(propID__pk=propTeamID) & Q(oppID__pk=oppTeamID) & Q(roundID__pk=r_id))       
        matchup.win = propTeamID if points_prop > points_opp else oppTeamID
        matchup.save()

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
                self.update_matchup_win(teams, r_id, team_points)
            return Response({"status": "success"})
        else:
            return Response({"status": "failed"})




class AddTeam(APIView):
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



# class idea: AddMember API that simply adds team members to an existing team
# class idea: Find tournamentID given a tournament name to help frontend out
