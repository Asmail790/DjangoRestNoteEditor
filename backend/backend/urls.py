from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from . import views

# create a router object
router = routers.DefaultRouter()

# register the router
router.register(r'tasks',views.NoteView, 'task')

urlpatterns = [
    path('api/', include(router.urls))
]