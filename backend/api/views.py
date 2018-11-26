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

    def get(self, request, t_id):
        teams = Team.objects.all()
        teamlist = TeamSerializer(teams, many=True)

        matched_team = []
        matchup_two = []
        count = 0
        for team in teamlist.data:
            count += 1
            current_id = list(team.items())[3][1]
            if(current_id == t_id):
                matchup_two.append(team)
            if(count % 2 == 0):
                matched_team.append(matchup_two)
                matchup_two = []
        if(len(matchup_two) == 1):
            matchup_two.append({"name": "Swing Team"})
            matched_team.append(matchup_two)
        return Response({"matchups" : matched_team})
