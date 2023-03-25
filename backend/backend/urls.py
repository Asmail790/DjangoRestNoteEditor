from django.contrib.auth import views as auth_views
from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


noteViewRouter = DefaultRouter()
favouriteNotesRouter = DefaultRouter()
UpdateFavouriteNotesRouter = DefaultRouter()

noteViewRouter.register(prefix="note", viewset=views.NoteView, basename="note")
favouriteNotesRouter.register(
    prefix="favourite", viewset=views.FavouriteNotes, basename="favourite")

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('user/info', views.get_user_info, name="get_user_info"),
    path('user/create', views.create_account, name="create_account"),
    path("user/authenticate-email/",
         views.authenticate_user_email, name="authenticate_user_email"),
    path("user/activate-account/", views.activate_user, name="activate_user")


] + noteViewRouter.urls + favouriteNotesRouter.urls
