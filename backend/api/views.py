from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import Team, Tournament, Round, MemberPoint, JudgePoint, MatchUp, Judge, Member, Club
from api.serializers import UserSerializer, GroupSerializer, TeamSerializer, TournamentSerializer, RoundSerializer, MemberPointSerializer, JudgePointSerializer, MatchUpSerializer, JudgeSerializer, MemberSerializer, ClubSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import api_view
from collections import defaultdict
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
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TournamentViewSet(viewsets.ModelViewSet):

    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class MemberPointViewSet(viewsets.ModelViewSet):
    queryset = MemberPoint.objects.all()
    serializer_class = MemberPointSerializer

class JudgePointViewSet(viewsets.ModelViewSet):
    queryset = JudgePoint.objects.all()
    serializer_class = JudgePointSerializer

class MatchUpViewSet(viewsets.ModelViewSet):
    queryset = MatchUp.objects.all()
    serializer_class = MatchUpSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class JudgeViewSet(viewsets.ModelViewSet):
    queryset = Judge.objects.all()
    serializer_class = JudgeSerializer

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

class RoundViewSet(viewsets.ModelViewSet):
    queryset = Round.objects.all()
    serializer_class = RoundSerializer

class Tournament_Matchups(APIView):
    authentication_classes = (authentication.BasicAuthentication,authentication.SessionAuthentication)
    permission_classes = (permissions.IsAuthenticated,)


    def alterMatchups(self, club_teams, matched_teams, ct_length):
        counter = 0
        club_id = club_teams[0][1]
        outer_flag = True
        inner_flag = True
        mt_length = len(matched_teams)

        if(len(club_teams) < 2):
                outer_flag = False
        while(outer_flag): #runs until if there is possibbility of a matchup
            team_pair = []
            team1 = club_teams.pop()
            team2 = club_teams.pop() 
            while(inner_flag): #checks to find if there are teams matched with  different ids than the current club id      
                team_pair = matched_teams[counter]
                if (team_pair[0][1] != club_id and team_pair[1][1] != club_id):
                    inner_flag = False
                counter += 1
                if( counter == mt_length):
                    inner_flag = False
            if(team_pair == [] or len(club_teams) < 2):
                outer_flag = False
                matched_teams.extend([ [team1, "swing team"], [team2, "swing team"] ])
            else:
                matched_teams.extend([ [team1, team_pair[1]], [team2, team_pair[0]] ])
                matched_teams.remove(team_pair)
        
        
        for team in club_teams: #after math for all the teams that can not be matched into swing team
            matched_teams.append([team, "swing team"])
        return matched_teams        

    def createMatchups(self, teamlist, judgelist, total_lengths):
        buffer_teams, skipped = (0, 0)
        last_clubid = None
        len_teams = total_lengths[0]
        pair, matched_team = ([], [])

        while(skipped < (len_teams - 1) ):
            for key, value in teamlist.items():
                if (value != []):
                    last_clubid = key
                    pair.append(value.pop())
                    buffer_teams += 1
                else:
                    skipped += 1
                if(buffer_teams == 2):
                    buffer_teams = 0
                    matched_team.append(pair)
        
        for team in pair:
            teamlist[last_clubid].append(team)

        if(teamlist[last_clubid] != []):
            matched_team = self.alterMatchups(teamlist[last_clubid], matched_team, len_teams)

        counter = 0
        len_matched_teams = len(matched_team)
        for judge in judgelist:
            matched_team[counter].append(judge)
            counter += 1
            if (counter == len_matched_teams):
                break
        return matched_team


        #pairing of judges: there might be lot but we need only handful => we have a problem if there are not enough judges
    

    def get(self, request, t_id, r_id):
        rounds = Round.objects.all()
        roundlist = RoundSerializer(rounds, many=True)
       
        teams = Team.objects.all()
        teamlist = TeamSerializer(teams, many=True)
       
        judges = Judge.objects.all()
        judgelist = JudgeSerializer(judges, many=True)
       
        matchup_judges, matchup_teams = ([], {})
        total_teams, total_judges = (0, 0)
        for team in teamlist.data:
            tournament_id = list(team.items())[3][1]
            club_id = list(team.items())[2][1]
            if(tournament_id == t_id): 
                total_teams += 1
                if(club_id in matchup_teams):
                    matchup_teams[club_id].append((team, club_id))
                else:
                    matchup_teams[club_id]= [team]
        
        for judge in judgelist.data:
            tournament_id = list(judge.items())[1][1]
            club_id = list(judge.items())[2][1]
            if(tournament_id == t_id):
                total_judges += 1
                matchup_judges.append((judge, club_id))

        
        matchups = self.createMatchups(matchup_teams, matchup_judges, (total_teams, total_judges))

        statement = [list(r.items())[2][1] for r in roundlist.data if (list(r.items())[1][1] == t_id and list(r.items())[0][1] == r_id)][0]
        return Response(
        {"matchups" : matchups,
         "statement": statement
        })
