from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from .models import Note


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
