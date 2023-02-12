import io
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import filters
from rest_framework.request import HttpRequest
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser

from .models import Note
from .serializers import StarMarkedNoteSerializer, NoteSerializer

# Create your views here.


class NoteView(viewsets.ModelViewSet):
    renderer_classes = [JSONRenderer]
    serializer_class = NoteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'rawText']
    queryset = Note.objects.all().order_by('pk')


parser = JSONParser()


@api_view(['POST'])
@parser_classes([JSONParser])
def hello_world(request: HttpRequest):

    stream = io.BytesIO(request.body)
    data = parser.parse(stream)
    starMarkedSerializer = StarMarkedNoteSerializer(data=data)
    if starMarkedSerializer.is_valid():
        id = starMarkedSerializer.validated_data["noteID"]
        starMarked = starMarkedSerializer.validated_data["starMarked"]

        note = Note.objects.get(pk=id)
        note.starMarked = starMarked
        note.save()
        return Response({"noteID": id, "successful": True})

    return Response({"noteID": id, "successful": False})
