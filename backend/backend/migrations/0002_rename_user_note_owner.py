# Generated by Django 4.1.5 on 2023-03-28 22:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='user',
            new_name='owner',
        ),
    ]
