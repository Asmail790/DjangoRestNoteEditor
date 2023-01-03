from django.contrib import admin

# Register your models here.
from django.contrib import admin

# import the model Todo
from .models import Note

@admin.action(description='Mark selected stories as published')
def make_published(modeladmin, request, queryset):pass 

# create a class for the admin-model integration
class NoteAdmin(admin.ModelAdmin):

# add the fields of the model here
    list_display = ("title",)
    actions = [make_published]


admin.site.register(Note,NoteAdmin)