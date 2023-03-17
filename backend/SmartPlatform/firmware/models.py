from django.db import models

from users.models import Device


class FirmwarePrograms(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name='firmwares')
    success = models.BooleanField(default=False)
    create_date = models.DateTimeField(auto_now_add=True)
    programm = models.FileField(blank=True, upload_to='programs/%Y/%m/%d')

