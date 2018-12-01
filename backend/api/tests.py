from django.test import TestCase
from api.models import Tournament
from api.models import Team
from api.models import Club
import datetime
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
# Create your tests here.

class TournamentTestCase(APITestCase):
#   testing multiple tournaments

    def setUp(self):
        time = datetime.date.today()
        t1 = Tournament.objects.create(name = "first", location="here", start_date = time, end_date = time)
        t2 = Tournament.objects.create(name = "second", location="here", start_date = time, end_date = time)

    def test_name(self):
        first = Tournament.objects.get(name="first")
        self.assertEqual(first.name, "first")
    
    def test_create_tournament(self):
        url = "/tournaments/"
        time = datetime.date.today()
        data = {"name": "first", "location": "here", "start_date": time, "end_date": time}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Tournament.objects.count(), 3)

    def test_view_tournament(self):
        url = "/tournaments/"
        time = datetime.date.today()
        data = {"name": "first", "location": "here", "start_date": time, "end_date": time}
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Tournament.objects.count(), 2)
# all the above worked!!!!!
# below, we were trying to post teams to a tournament and get them, but alas
"""
    def test_add_team(self):
        url = "/tournaments/1/"
        time = datetime.date.today()
        test_tournament = Tournament.objects.create(name = "first", location="here", start_date = time, end_date = time)
        test_club = Club.objects.create(name = "Carl's Club")
        test_team = Team.objects.create(name = "Carl's Team", city = "Atlanta", clubName = test_club, tournamentID = test_tournament)
        data = {"name": "Carl's Team", "city": "Atlanta", "clubName": "Carl's Club", "tournametID": "1"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 1)
"""

class TeamTestCase(APITestCase):
    def setUp(self):
        test_club = Club.objects.create(name = "Carl's Club")
        time = datetime.date.today()
        test_tournament = Tournament.objects.create(name = "first", location="here", start_date = time, end_date = time)
        Team.objects.create(name = "Carl's Team", city = "Atlanta", clubName = test_club, tournamentID = test_tournament)

    def test_name(self):
        carls_team = Team.objects.get(name="Carl's Team")
        self.assertEqual(carls_team.name, "Carl's Team")
    
    # def test_member_teams(self):

        #test get and post for each object from each view
        #focus on get and post request for tournament class and then make PR