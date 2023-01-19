from urllib import response
from rest_framework import viewsets 
from .serializers import NoteSerializer

from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.renderers import JSONRenderer

from .models import Note

# Create your views here.









class NoteView(viewsets.ModelViewSet):
    renderer_classes = [JSONRenderer]
    serializer_class = NoteSerializer
    queryset = Note.objects.all()