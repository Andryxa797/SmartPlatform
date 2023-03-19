from rest_framework import serializers

from firmware.models import FirmwarePrograms


class FirmwareProgramsSerializer(serializers.ModelSerializer):
    programm_absolute_url = serializers.SerializerMethodField(required=False)

    class Meta:
        model = FirmwarePrograms
        fields = '__all__'

    def get_programm_absolute_url(self, obj):
        request = self.context.get('request')
        if obj.programm and obj.programm.url:
            return request.build_absolute_uri(obj.programm.url)