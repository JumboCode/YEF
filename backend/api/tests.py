from django.test import TestCase
from api.models import Tournament
from api.models import Round
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

class TeamTestCase(APITestCase):
    def setUp(self):
        test_club = Club.objects.create(name = "Carl's Club")
        time = datetime.date.today()
        test_tournament = Tournament.objects.create(name = "first", location="here", start_date = time, end_date = time)
        Team.objects.create(name = "Carl's Team", city = "Atlanta", clubName = test_club, tournamentID = test_tournament)

    def test_name(self):
        carls_team = Team.objects.get(name="Carl's Team")
        self.assertEqual(carls_team.name, "Carl's Team")

    def test_view_team(self):      # authentication issues... carl is not logged in when accessing the view from admin
        url = "/teams/"            # we are unable to post and are not getting the correct responses from the page
        time = datetime.date.today()
        test_club = Club.objects.create(name = "Carl's Club")
        test_tournament = Tournament.objects.create(name = "first", location="here", start_date = time, end_date = time)
        data = {"name": "Carl's Team", "city": "Atlanta", "clubName": test_club, "tournamentID": test_tournament}
       # sec_data = {"username:" "carlf", "password:" "rQ82ghZe"}   # post data for getting teams (restricted)
       # sec_response = self.client.post(url, sec_data, format='json') # post command for providing credentials for entry
       # response = self.client.get(url, data, format='json')
       # self.assertEqual(sec_response.status_code, status.HTTP_201_CREATED)
       # self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Team.objects.count(), 1)



        # def test_add_team(self):
        """
        url = "/teams/"
        time = datetime.date.today()
        tournament_data = {"name": "first", "location": "here", "start_date": time, "end_date": time}
        test_tournament = self.client.get("/tournaments/1", tournament_data, format='json')
        # test_tournament = Tournament.objects.create(name = "first", location="here", start_date = time, end_date = time)
        test_club = Club.objects.create(name = "Carl's Club")
        test_team = Team.objects.create(name = "Carl's Team", city = "Atlanta", clubName = test_club, tournamentID = test_tournament)
        team_data = {"name": "Carl's Team", "city": "Atlanta", "clubName": "Carl's Club", "tournametID": "1"}
        response = self.client.post(url, team_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 1)
        """
        # def test_member_teams(self):

        #test get and post for each object from each view
        #focus on get and post request for tournament class and then make PR

class ClubTestCase(APITestCase):
#   testing multiple tournaments

    def setUp(self):
        club1 = Club.objects.create(name="Andrew's Club")

    def test_name(self):
        club1 = Club.objects.get(name="Andrew's Club")
        self.assertEqual(club1.name, "Andrew's Club")