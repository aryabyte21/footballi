# Generated by Django 3.1.5 on 2022-08-22 13:03

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0003_auto_20220822_1259'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Players',
            new_name='Player',
        ),
        migrations.RenameModel(
            old_name='Teams',
            new_name='Team',
        ),
    ]
