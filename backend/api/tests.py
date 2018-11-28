from django.test import TestCase
from api.models import Tournament
from api.models import Team
import datetime
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
# Create your tests here.

class TournamentTestCase(APITestCase):
    def setUp(self):
        time = datetime.date.today()
        Tournament.objects.create(name = "first", location="here", start_date = time, end_date = time)
        

    def test_name(self):
        first = Tournament.objects.get(name="first")
        self.assertEqual(first.name, "first")
    
    def test_create_tournament(self):
        url = "/tournaments/"
        time = datetime.date.today()
        data = {"name": "first", "location": "here", "start_date": time, "end_date": time}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)