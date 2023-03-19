import os

from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver

from SmartPlatform import settings
from firmware.models import FirmwarePrograms


@receiver(pre_delete, sender=FirmwarePrograms)
def delete_product_image(sender, instance, **kwargs):
    file_path = os.path.join(settings.MEDIA_ROOT, str(instance.programm))
    if os.path.exists(file_path):
        os.remove(file_path)
