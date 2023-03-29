from django.forms import ValidationError
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from .models import Note
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import AbstractBaseUser
from django.core.validators import MinLengthValidator, MaxLengthValidator, validate_unicode_slug, EmailValidator
from django.contrib.auth.backends import ModelBackend


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        exclude = ['owner']


class StarMarkedNoteSerializer(serializers.Serializer):
    starMarked = serializers.BooleanField()
    noteID = serializers.IntegerField()

    def validate_noteID(self, value: int):
        try:
            note = Note.objects.all().get(pk=value)
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                "The note do not exist on the server")
        return value


class RegisterSerializer(serializers.Serializer):

    min_length_name = 3
    max_length_name = 100
    min_length_password = 6
    max_length_password = 100

    username = serializers.CharField(validators=[
        validate_unicode_slug,
        MinLengthValidator(min_length_name),
        MaxLengthValidator(max_length_name),
    ])

    password = serializers.CharField(validators=[
        validate_unicode_slug,
        MinLengthValidator(min_length_password),
        MaxLengthValidator(max_length_password)
    ])

    first_name = serializers.CharField(
        validators=[
            validate_unicode_slug,
            MinLengthValidator(min_length_name),
            MaxLengthValidator(max_length_name)
        ]
    )

    last_name = serializers.CharField(
        validators=[
            validate_unicode_slug,
            MinLengthValidator(min_length_name),
            MaxLengthValidator(max_length_name)
        ]
    )

    email = serializers.EmailField(
        validators=[
            EmailValidator,
            UniqueValidator(
                queryset=get_user_model().objects.filter(is_active=True),
                message="The email is already taken by some."
            )])

    def create(self, validated_data) -> AbstractBaseUser:
        email = validated_data["email"]

        if get_user_model().objects.filter(is_active=False, email=email).exists():

            user = get_user_model().objects.get(is_active=False, email=email)
            user.username = validated_data["username"]
            user.set_password(raw_password=validated_data["password"])
            user.first_name = validated_data["first_name"]
            user.last_name = validated_data["last_name"]
            return user

        else:
            user = get_user_model().objects.create_user(
                email=validated_data["email"],
                username=validated_data["username"],
                password=validated_data["password"],
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
                is_active=False
            )

        return user
