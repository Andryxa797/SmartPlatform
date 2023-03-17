from django.contrib import admin
from users.models import Profile, Device


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'create_date')


class DeviceAdmin(admin.ModelAdmin):
    list_display = ('uuid_public', 'create_date')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Device, DeviceAdmin)
