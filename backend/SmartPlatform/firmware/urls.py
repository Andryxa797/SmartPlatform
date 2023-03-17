from django.urls import path

from firmware.views import CreateFirmware

urlpatterns = [
    path('', CreateFirmware.as_view()),
]
