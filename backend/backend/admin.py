from django.contrib import admin

# Register your models here.
from django.contrib import admin

# import the model Todo
from .models import Note, EmailAuthenticationToken


admin.site.register(Note)
admin.site.register(EmailAuthenticationToken)
