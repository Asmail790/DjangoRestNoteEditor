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


from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView




urlpatterns = [
    path('notes/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("hello", views.hello_world)
]