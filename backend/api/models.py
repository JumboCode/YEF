from django.db import models

# Create your models here.

class Tournament(models.Model):
    name = models.CharField(max_length = 30)
    location = models.CharField(max_length = 30)
    start_date = models.DateField()
    end_date = models.DateField()

class Team(models.Model): #check the Model to see what the inherited class consist
	name = models.CharField(max_length=255)
	city = models.CharField(max_length=512)
	clubName = models.CharField(max_length=512)
	member1 = models.CharField(max_length=255)
	member2 = models.CharField(max_length=255)
	member3 = models.CharField(max_length=255)
	tournamentID = models.ForeignKey(Tournament, on_delete=models.CASCADE) #check what models.CASCADE is doing