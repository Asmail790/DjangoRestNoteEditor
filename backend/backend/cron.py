from django.contrib.auth.models import User
from django.utils import timezone


def remove_unactive_accounts():
    # CHANCE TO WEEK
    for user in User.objects.filter(is_active=False, date_joined__lt=timezone.now() - timezone.timedelta(days=1)):
        user.delete()
