from . import views
from rest_framework.routers import DefaultRouter



router = DefaultRouter()

router.register(prefix="note", viewset= views.NoteView, basename="note")
urlpatterns = router.urls
