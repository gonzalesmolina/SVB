from django.contrib import admin

from apps.rest_auth.models import Address, UserProfile


admin.site.register(Address)
admin.site.register(UserProfile)
