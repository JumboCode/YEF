from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Team
from api.models import Tournament

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class TeamSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Team
		fields = ('name', 'city', 'clubName', 'member1', 'member2', 'member3')

class TournamentSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Tournament
		fields = ('name', 'location', 'start_date', 'end_date')
