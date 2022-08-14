from django.contrib.auth.models import User
from django.db import models
from uuid import uuid4

from enumchoicefield import EnumChoiceField, ChoiceEnum


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(blank=True, upload_to='media/%Y/%m/%d')
    create_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Профиль пользователя'
        verbose_name_plural = 'Профили'

    def __str__(self):
        return self.user.username


class DeviceType(ChoiceEnum):
    LED = "Led"


class Device(models.Model):
    uuid_public = models.UUIDField(primary_key=False, default=uuid4, editable=False)
    uuid_private = models.UUIDField(primary_key=False, default=uuid4, editable=False)
    name = models.CharField(max_length=250)
    avatar = models.ImageField(blank=True, upload_to='media/%Y/%m/%d')
    create_date = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='device')
    type = EnumChoiceField(enum_class=DeviceType, default=DeviceType.LED)
    wifi_name = models.CharField(max_length=250)
    wifi_password = models.CharField(max_length=250)

    class Meta:
        verbose_name = 'Девайс'
        verbose_name_plural = 'Девайсы'
