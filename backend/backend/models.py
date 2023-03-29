import uuid
import os
from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _


class EmailUniqueUser(AbstractUser):

    username_validator = UnicodeUsernameValidator()

    username = username = models.CharField(
        _("username"),
        max_length=150,
        unique=False,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
    )

    email = models.EmailField(_("email address"),   unique=True,  error_messages={
        "unique": _("A user with that email already exists."),
    },)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"


class Note(models.Model):
    owner = models.ForeignKey(
        EmailUniqueUser, on_delete=models.CASCADE)
    title = models.TextField(blank=True)
    starMarked = models.BooleanField(default=False)
    text = models.TextField(blank=True)
    rawText = models.TextField(blank=True)


class EmailAuthenticationToken(models.Model):

    user = models.ForeignKey(
        EmailUniqueUser, on_delete=models.CASCADE, editable=True)

    time_created = models.DateTimeField(  # DateTimeField
        default=timezone.now,  editable=False)

    expire_time_duration = models.DurationField(
        default=timezone.timedelta(days=1), editable=False)

    uuid = models.UUIDField(default=uuid.uuid4, editable=False)

    def expire_timestamp(self) -> timezone.datetime:
        expire_time = self.time_created + self.expire_time_duration
        return expire_time

    def is_expired(self) -> bool:
        return self.expire_timestamp() < timezone.now()

    def __str__(self) -> str:
        return str((self.user, self.uuid))
