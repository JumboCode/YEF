from django.db import models

class Tournament(models.Model):
    name = models.CharField(max_length = 30)
    location = models.CharField(max_length = 30)
    start_date = models.DateField()
    end_date = models.DateField()

class Club(models.Model):
    name = models.CharField(max_length=512)

class Team(models.Model):
	name = models.CharField(max_length=255)
	city = models.CharField(max_length=512)
	clubName = models.ForeignKey(Club, on_delete=models.CASCADE)
	tournamentID = models.ForeignKey(Tournament, on_delete=models.CASCADE)

class Judge(models.Model):
    name = models.CharField(max_length=512)
    tournamentID = models.ForeignKey(Tournament, on_delete=models.CASCADE, null=True)
    clubID = models.ForeignKey(Club, on_delete=models.CASCADE)


class Member(models.Model):
    name = models.CharField(max_length=512)
    teamID = models.ForeignKey(Team, on_delete=models.CASCADE)
    clubID = models.ForeignKey(Club, on_delete=models.CASCADE)

class Round(models.Model):
    round = models.IntegerField()
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    statement = models.CharField(max_length=4096)

class MatchUp(models.Model):
    oppID = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='opposition')
    propID = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='proposition')
    judgeID = models.ForeignKey(Judge, on_delete=models.CASCADE)
    roundID = models.ForeignKey(Round, on_delete=models.CASCADE)
    win = models.ForeignKey(Team, on_delete=models.CASCADE, null=True)
    decision = models.CharField(max_length=20, choices=(
        ("Split",'Split'),
        ("Unaminous",'Unaminous')), default='Split')

class MemberPoint(models.Model):
    memberID = models.ForeignKey(Member, on_delete=models.CASCADE)
    roundID = models.ForeignKey(Round, on_delete=models.CASCADE)
    StylePoints = models.FloatField()
    ContentPoints = models.FloatField()
    StrategyPoints = models.FloatField()

class JudgePoint(models.Model):
    judgeID = models.ForeignKey(Judge, on_delete=models.CASCADE)
    points = models.FloatField()
    roundID = models.ForeignKey(Round, on_delete=models.CASCADE)
