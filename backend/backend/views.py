from django.http import QueryDict
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from uuid import UUID
import io
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework import filters
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser


from .models import Note, EmailAuthenticationToken
from .serializers import StarMarkedNoteSerializer, NoteSerializer, RegisterSerializer
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.decorators import renderer_classes
from rest_framework import status
from datetime import time, datetime
from .utility import send_message
from .utility import reverse_with_query_parms
# Create your views here.

json_parser = JSONParser()
json_renderer = JSONRenderer()


class NoteView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    renderer_classes = [JSONRenderer]
    serializer_class = NoteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'rawText']
    queryset = Note.objects.all().order_by('pk')


class FavouriteNotes (mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    renderer_classes = [JSONRenderer]
    serializer_class = NoteSerializer
    queryset = Note.objects.filter(starMarked=True).order_by('pk')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request: Request):
    # TODO  get_object_or_404 instead of get?
    user = User.objects.get(username=request.user.username)
    return Response({"first_name": user.first_name, "last_name": user.last_name, "email": user.email, "username": user.username})


@api_view(['GET'])
def create_account(request: Request):
    io.BytesIO()
    data = json_parser.parse(io.BytesIO(request.body))

    serializer = RegisterSerializer(data=data)

    if serializer.is_valid():

        user = User.objects.create_user(**serializer.validated_data)
        user.is_active = False
        user.save()

        return Response(status=status.HTTP_200_OK)

    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def authenticate_user_email(request: Request):
    email = request.query_params["email"]

    if not User.objects.filter(email=email).exists():
        return Response(status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.get(email=email)
    email_authentication_token = EmailAuthenticationToken.objects.create(
        user=user)
    email_authentication_token.save()

    url_with_query_parms = reverse_with_query_parms(
        activate_user, request=request, query_parms={"token": email_authentication_token.uuid.hex})
    subject = "Register account in DjanoNoteEditor"
    content = f'To continue with your account registration please follow this link "{url_with_query_parms}"'

    result = send_message(email_to=email,
                          subject=subject, content=content)

    return Response({"code": result.status_code})


@api_view(['GET'])
@renderer_classes([TemplateHTMLRenderer])
def activate_user(request: Request):
    query_parms = request.query_params

    token = query_parms["token"]
    uuid_token = UUID(token)

    if not EmailAuthenticationToken.objects.filter(uuid=uuid_token).exists():

        return Response(template_name="backend/expired_link.html")

    emailAuthenticationToken = EmailAuthenticationToken.objects.get(
        uuid=uuid_token)

    user = emailAuthenticationToken.user

    if user.is_active:

        for token in EmailAuthenticationToken.objects.filter(user=user):
            token.delete()

        context = {"username": user.username}
        return Response(context, template_name="backend/account_activated.html")

    if not emailAuthenticationToken.isExpired():
        user = emailAuthenticationToken.user
        user.is_active = True
        user.save()

        for token in EmailAuthenticationToken.objects.filter(user=user):
            token.delete()

        context = {"username": user.username}
        return Response(context, template_name="backend/account_activated.html")

    return Response(template_name="backend/expired_link.html")
