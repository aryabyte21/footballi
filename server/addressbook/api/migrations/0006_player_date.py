# Generated by Django 3.1.5 on 2022-08-23 11:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_tournament'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='date',
            field=models.DateField(default=datetime.date.today, verbose_name='Date'),
        ),
    ]
