from django.db import models

# Create your models here.

class Tournament(models.Model):
    name = models.CharField(max_length = 30)
    location = models.CharField(max_length = 30)
    start_date = models.DateField()
    end_date = models.DateField()