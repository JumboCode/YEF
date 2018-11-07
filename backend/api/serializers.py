from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Team
from api.models import Tournament

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
        fields = ('name', 'city', 'clubName', 'member1', 'member2', 'member3', 'tournamentID')

class TournamentSerializer(serializers.ModelSerializer):
    #teams = serializers.HyperlinkedIdentityField(view_name='Team-detail')
    #teams = TeamSerializer(source='team_set', many=True)

    class Meta:
        model = Tournament
        fields = ('id', 'name', 'location', 'start_date', 'end_date')
