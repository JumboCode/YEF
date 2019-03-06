from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Team, Tournament, Round, MemberPoint, JudgePoint, MatchUp, Judge, Member, Club


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', "name", "teamID", "clubID")
class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', "name"]

class TeamSerializer(serializers.ModelSerializer):
    club_name = serializers.ReadOnlyField(source='clubID.name')
    members = MemberSerializer(source='member_set', many=True, read_only=True)
    class Meta:
        model = Team
        fields = ('id', 'name', 'city', 'clubID',  'tournamentID', 'club_name', 'members')

class MatchUpSerializer(serializers.ModelSerializer):
    opp_name = serializers.ReadOnlyField(source='oppID.name')
    prop_name = serializers.ReadOnlyField(source='propID.name')
    class Meta:
        model = MatchUp
        fields = ('id', "oppID", "propID", "judgeID", "roundID", "opp_name", "prop_name")
class RoundSerializer(serializers.ModelSerializer):
    matchups = MatchUpSerializer(source='matchup_set', many=True, read_only=True)
    class Meta:
        model = Round
        fields = ('id', "round","tournamentID", "statement", "matchups")

class TournamentSerializer(serializers.ModelSerializer):
    #teams = serializers.HyperlinkedIdentityField(view_name='Team-detail')
    teams = TeamSerializer(source='team_set', many=True, read_only=True)
    rounds = RoundSerializer(source='round_set', many=True, read_only=True)

    class Meta:
        model = Tournament
        fields = ('id', 'name', 'location', 'start_date', 'end_date', 'teams', 'rounds')

class TeamsInTournamentSerializer(serializers.ModelSerializer):
    #teams = serializers.HyperlinkedIdentityField(view_name='Team-detail')
    teams = TeamSerializer(source='team_set', many=True)
    class Meta:
        model = Tournament
        fields = ('id', 'name', 'location', 'start_date', 'end_date', 'teams')

class MemberPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberPoint
        fields = ('id', "memberID", "roundID", "StylePoints", "ContentPoints", "StratergyPoints")

class JudgePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = JudgePoint
        fields = ('id', "judgeID", "points", "roundID")

class JudgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Judge
        fields = ('id', "name", "tournamentID", "clubID")

