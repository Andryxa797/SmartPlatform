from rest_framework import serializers

from firmware.serializers import FirmwareProgramsSerializer
from users.models import Profile, Device


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ('is_device',)


class DeviceSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    firmwares = FirmwareProgramsSerializer(many=True, read_only=True)

    class Meta:
        model = Device
        fields = '__all__'
        read_only_fields = ('id', 'uuid_public', 'uuid_private', 'owner', 'avatar', 'create_date')
