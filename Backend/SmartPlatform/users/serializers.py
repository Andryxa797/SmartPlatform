from rest_framework import serializers

from users.models import Profile, Device


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ('is_device',)


class DeviceSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Device
        fields = '__all__'
        read_only_fields = ('uuid', 'owner')
