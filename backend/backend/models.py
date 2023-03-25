import uuid
import os
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Note(models.Model):
    title = models.TextField(blank=True)
    starMarked = models.BooleanField(default=False)
    text = models.TextField(blank=True)
    rawText = models.TextField(blank=True)


class EmailAuthenticationToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=True)
    expire_time = models.DateTimeField(  # DateTimeField
        default=lambda: timezone.now() + timezone.timedelta(hours=1),  editable=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)

    def isExpired(self) -> bool:
        return self.expire_time < timezone.now()

    def __str__(self) -> str:
        return str((self.user, self.uuid))
