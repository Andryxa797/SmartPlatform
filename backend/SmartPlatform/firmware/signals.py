import os
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver
from .models import FirmwarePrograms

@receiver(pre_delete, sender=FirmwarePrograms)
def delete_program_file(sender, instance, **kwargs):
    if instance.programm:
        if os.path.isfile(instance.programm.path):
            os.remove(instance.programm.path)