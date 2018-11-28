from django.test import TestCase
from api.models import Tournament
from api.models import Team
import datetime
# Create your tests here.

class TournamentTestCase(TestCase):
    def setUp(self):
        time = datetime.date.today()
        Tournament.objects.create(name = "first", location="here", start_date = time, end_date = time)
        

        def test_name(self):
            first = Tournament.objects.get(name="first")
            self.assertEqual(first.name)