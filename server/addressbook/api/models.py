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
        return "%s - %s" % (self.name, self.city)


class Match(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    tournament_name = models.CharField(max_length=100, default=None)
    date = models.DateField(("Date"), default=date.today)
    opponent = models.CharField(max_length=100, default=None)
    goals = models.IntegerField(default=0)
    opponent_goals = models.IntegerField(default=0)
    opponent_icon = models.URLField(max_length=2000, default=None)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    draw = models.IntegerField(default=0)
    full_match = models.URLField(max_length=2000, default=None)
    first_half = models.URLField(max_length=2000, default=None)
    second_half = models.URLField(max_length=2000, default=None)
    home_fouls = models.IntegerField(default=0)
    away_fouls = models.IntegerField(default=0)
    home_yellow = models.IntegerField(default=0)
    away_yellow = models.IntegerField(default=0)
    home_red = models.IntegerField(default=0)
    away_red = models.IntegerField(default=0)
    home_passes = models.IntegerField(default=0)
    away_passes = models.IntegerField(default=0)
    home_tackles = models.IntegerField(default=0)
    away_tackles = models.IntegerField(default=0)
    home_corners = models.IntegerField(default=0)
    away_corners = models.IntegerField(default=0)
    home_possession = models.IntegerField(default=0)
    away_possession = models.IntegerField(default=0)
    home_cross = models.IntegerField(default=0)
    away_cross = models.IntegerField(default=0)
    home_shoton = models.IntegerField(default=0)
    away_shoton = models.IntegerField(default=0)
    home_shots = models.IntegerField(default=0)
    away_shots = models.IntegerField(default=0)

    def __str__(self):
        return "%s - %s" % (self.tournament_name, self.date)


class Performance(models.Model):
    match = models.ForeignKey(Match, models.CASCADE, default=None)
    user = models.ForeignKey(User, models.CASCADE, default=None)
    tournament = models.CharField(max_length=200, default=None)
    date = models.DateField(("Date"), default=None)
    name1 = models.CharField(max_length=200, default=None)
    position = models.CharField(max_length=200, default=None)
    assists = models.IntegerField(default=0)
    yellows = models.IntegerField(default=0)
    reds = models.IntegerField(default=0)
    goals = models.IntegerField(default=0)
    freekicks = models.IntegerField(default=0)
    corners = models.IntegerField(default=0)
    fouls_commited = models.IntegerField(default=0)
    tackles_accuracy = models.IntegerField(default=0)
    recovered_balls = models.IntegerField(default=0)
    tackles = models.IntegerField(default=0)
    penalties_taken = models.IntegerField(default=0)
    penalties_scored = models.IntegerField(default=0)

    def __str__(self):
        return "%s - %s" % (self.name1, self.goals)


class Video(models.Model):
    match = models.ForeignKey(Match, models.CASCADE, default=None)
    user = models.ForeignKey(User, models.CASCADE, default=None)
    video = models.URLField(max_length=2000, default=None)
    type = models.CharField(max_length=150, default=None)
    opponent = models.CharField(max_length=200, default=None)
    tournament = models.CharField(max_length=200, default=None)
    date = models.DateField(("Date"), default=date.today)
    win_lose = models.CharField(max_length=4, default=None)

    def __str__(self):
        return "%s - %s" % (self.opponent, self.date)


class VideoK(models.Model):
    user = models.ForeignKey(User, models.CASCADE, default=None)
    date = models.DateField(("Date"), default=date.today)
    video = models.URLField(max_length=2000, default=None)
    tournament_name = models.CharField(max_length=1000, default=None)
    season = models.CharField(max_length=500, default=None)
    match_no = models.CharField(max_length=100, default=None)
    raider_name = models.CharField(max_length=500, default=None)
    number_of_defender = models.CharField(max_length=100, default=None)
    outcome = models.CharField(max_length=500, default=None)
    raiding_team_points = models.CharField(max_length=100, default=None)
    bonus = models.CharField(max_length=300, default=None)
    raiding_team_name = models.CharField(max_length=100, default=None)
    defending_team_name = models.CharField(max_length=300, default=None)
    attacking_skills = models.CharField(max_length=300, default=None)
    defensive_skills = models.CharField(max_length=300, default=None)
    counter_action_skills = models.CharField(max_length=300, default=None)

    def __str__(self):
        return "%s - %s" % (self.opponent, self.date)
