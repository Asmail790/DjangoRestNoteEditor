from rest_framework import viewsets 
from .serializers import NoteSerializer
from .models import Note
# Create your views here.

class NoteView(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()



from rest_framework.decorators import api_view


from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.renderers  import JSONRenderer,TemplateHTMLRenderer
from rest_framework.decorators import renderer_classes, throttle_classes,schema

from rest_framework.throttling import UserRateThrottle

class OncePerDayUserThrottle(UserRateThrottle):
    rate = '1/min'

@api_view(['GET','POST'])
@renderer_classes([JSONRenderer])
#@throttle_classes([OncePerDayUserThrottle])
def hello_world(request):
    return Response({"message": "Hello, world!"})