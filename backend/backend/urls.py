from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from . import views
from rest_framework.authtoken.views import obtain_auth_token

# create a router object
router = routers.DefaultRouter()

# register the router
router.register(r'tasks',views.NoteView, 'task')


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


urlpatterns = [
    path('api/', include(router.urls)),
    path("register", obtain_auth_token),
    path("hello", views.hello_world)
]