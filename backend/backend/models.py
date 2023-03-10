from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

# Create your models here.


class Note(models.Model):
    title = models.TextField(blank=True)
    starMarked = models.BooleanField(default=False)
    text = models.TextField(blank=True)
    rawText = models.TextField(blank=True)
