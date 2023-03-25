from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from .models import Note
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.validators import UnicodeUsernameValidator


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = "__all__"


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
    username = serializers.CharField(validators=[
        UnicodeUsernameValidator])

    password = serializers.CharField(
        validators=[validate_password])

    first_name = serializers.CharField()

    last_name = serializers.CharField()

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.filter(is_active=True))])

    def create(self, validated_data) -> User:
        email = validated_data["email"]

        if User.objects.filter(is_active=False, email=email).exists():

            user = User.objects.get(email)
            user.username = validated_data["username"]
            user.set_password(password=validated_data["password"])
            user.first_name = validated_data["first_name"]
            user.last_name = validated_data["last_name"]
            return user

        else:
            user = User.objects.create_user(
                email=validated_data["email"],
                username=validated_data["username"],
                password=validated_data["password"],
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
                is_active=False
            )

        return user
