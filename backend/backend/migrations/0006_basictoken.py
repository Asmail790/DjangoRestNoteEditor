# Generated by Django 4.1.5 on 2023-03-07 23:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_rename_important_note_starmarked'),
    ]

    operations = [
        migrations.CreateModel(
            name='BasicToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.UUIDField()),
                ('expireTime', models.DateTimeField(verbose_name=datetime.datetime(2023, 3, 8, 0, 8, 47, 73964))),
            ],
        ),
    ]
