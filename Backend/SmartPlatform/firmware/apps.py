from django.apps import AppConfig


class FirmwareConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'firmware'

    def ready(self):
        import firmware.signals
