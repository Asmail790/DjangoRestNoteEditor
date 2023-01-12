from rest_framework.authtoken.models import Token

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Note

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender= Note)
def my_callback(sender, **kwargs):
    print("Request finished!")