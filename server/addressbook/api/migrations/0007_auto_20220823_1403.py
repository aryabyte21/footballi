# Generated by Django 3.1.5 on 2022-08-23 14:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_player_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='date',
            new_name='dob',
        ),
    ]
