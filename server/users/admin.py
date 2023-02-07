from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'is_admin', 'phone_number', 'email', 'location')

# Register your models here.

admin.site.register(User, UserAdmin)