from django.contrib import admin

from firmware.models import FirmwarePrograms


class FirmwareProgramsAdmin(admin.ModelAdmin):
    list_display = ('success', 'create_date', 'programm')


admin.site.register(FirmwarePrograms, FirmwareProgramsAdmin)
