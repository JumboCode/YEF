from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Team, Tournament, Round, MemberPoint, JudgePoint, MatchUp, Judge, Member, Club


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('name', 'city', 'clubName',  'tournamentID')

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ('id', 'name', 'location', 'start_date', 'end_date', 'teams')

class MemberPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberPoint
        fields = ("memberID", "roundID", "StylePoints", "ContentPoints", "StratergyPoints")

class JudgePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = JudgePoint
        fields = ("judgeID", "points", "roundID")

class MatchUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchUp
        fields = ("oppID", "propID", "judgeID", "roundID")

class JudgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Judge
        fields = ("name", "teamID", "clubID")

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ("name", "teamID", "clubID")

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ("name")

class RoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Round
        fields = ("round","tournament", "statement","chair","win","decision")
