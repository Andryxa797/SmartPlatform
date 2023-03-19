from rest_framework import serializers

from firmware.models import FirmwarePrograms


class FirmwareProgramsSerializer(serializers.ModelSerializer):

    class Meta:
        model = FirmwarePrograms
        fields = '__all__'
