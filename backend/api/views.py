from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from api.models import Team, Tournament, Round, Club, Member, Judge, MatchUp, JudgePoint, MemberPoint
from api.serializers import UserSerializer, GroupSerializer, TeamSerializer, TournamentSerializer, TeamsInTournamentSerializer, RoundSerializer, MemberSerializer, MemberPointSerializer, JudgePointSerializer, ClubSerializer, JudgeSerializer, MatchUpSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView



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
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()#Team.objects.all()
    #serializer_class = TournamentSerializer
    def list(self, request):
        queryset = Tournament.objects.all()#Team.objects.all()
        serializer = TournamentSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Tournament.objects.all()
        tournament = get_object_or_404(queryset, pk=pk)
        serializer = TeamsInTournamentSerializer(tournament)
        return Response(serializer.data)

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

class JudgePointViewSet(viewsets.ModelViewSet):
    queryset = JudgePoint.objects.all()
    serializer_class = JudgePointSerializer

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

class JudgeViewSet(viewsets.ModelViewSet):
    queryset = Judge.objects.all()
    serializer_class = JudgeSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class MatchUpViewSet(viewsets.ModelViewSet):
    queryset = MatchUp.objects.all()
    serializer_class = MatchUpSerializer
        
"""class TeamList(APIView):
    
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    #authentication_classes = (authentication.BasicAuthentication,authentication.SessionAuthentication)
    #permission_classes = (permissions.IsAuthenticated,)

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
        return Response(matched_team)"""