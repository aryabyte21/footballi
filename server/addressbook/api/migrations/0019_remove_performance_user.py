# Generated by Django 3.1.5 on 2022-08-26 04:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20220826_0424'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='performance',
            name='user',
        ),
    ]
