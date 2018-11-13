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


class TeamList(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = (authentication.BasicAuthentication,authentication.SessionAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        r_id = ""
        if(request.query_params and "tournament" in request.query_params):
            r_id = request.query_params["tournament"]

        matched_team = defaultdict(list)
        teams = Team.objects.all()
        teamlist = TeamSerializer(teams, many=True)
        for team in teamlist.data:
            t_id = list(team.items())[6][1]
            matched_team[str(t_id)].append(team)
        if(r_id != ""):
            return Response(matched_team[r_id])
        return Response(matched_team)
