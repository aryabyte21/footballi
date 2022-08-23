from django.db import models
from django.contrib.auth import get_user_model
from datetime import date

User = get_user_model()

class Contact(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return "%s - %s" % (self.name, self.phone, )
class Player(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    player_id = models.CharField(max_length=100, default=None)
    team = models.CharField(max_length=100, default=None)
    player_foot = models.CharField(max_length=100, default=None)
    name = models.CharField(max_length=100, default=None)
    position = models.CharField(max_length=100, default=None)
    player_height = models.FloatField(null=True, blank=True)
    nationality = models.CharField(max_length=100, default=None)  
    dob = models.DateField(("Date"), default=date.today)
    def __str__(self):
        return "%s - %s" % (self.name, self.position, )


class Team(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    team_id = models.CharField(max_length=100, default=None)
    name = models.CharField(max_length=100, default=None)
    logo = models.URLField(max_length=500, default=None)
    coach = models.CharField(max_length=100, default=None)
    asst_coach = models.CharField(max_length=100, default=None)
    club = models.CharField(max_length=100, default=None)
    country = models.CharField(max_length=100, default=None)
    city = models.CharField(max_length=100, default=None)
    team_short_name = models.CharField(max_length=100, default=None)
    def __str__(self):
        return "%s - %s" % (self.name, self.city )

class Match(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    tournament_name = models.CharField(max_length=100, default=None)
    date = models.DateField(("Date"), default=date.today)
    opponent = models.CharField(max_length=100, default= None)
    goals = models.IntegerField(default=0)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    draw  = models.IntegerField(default = 0)

    def __str__(self):
        return "%s" % (self.tournament_name)



