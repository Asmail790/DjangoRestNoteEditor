from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register(prefix="note", viewset=views.NoteView, basename="note")
urlpatterns = [
    path('change-importance', views.hello_world, name="change-importance"),
] + router.urls
