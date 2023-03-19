from django.contrib import admin

from firmware.models import FirmwarePrograms


class FirmwareProgramsAdmin(admin.ModelAdmin):
    list_display = ('status', 'create_date', 'programm')


admin.site.register(FirmwarePrograms, FirmwareProgramsAdmin)
