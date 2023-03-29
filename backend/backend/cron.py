from django.contrib.auth import get_user_model
from django.utils import timezone


def remove_unactive_accounts():
    # CHANCE TO WEEK
    for user in get_user_model().objects.filter(is_active=False, date_joined__lt=timezone.now() - timezone.timedelta(days=1)):
        user.delete()
