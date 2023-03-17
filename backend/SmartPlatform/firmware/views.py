from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from firmware.models import FirmwarePrograms
from firmware.permissions import IsOwnerProfileOrReadOnly
from users.models import Device
from firmware.tasks import create_firmware
from users.serializers import DeviceSerializer


class CreateFirmware(APIView):
    permission_classes = [IsOwnerProfileOrReadOnly, IsAuthenticated]

    def post(self, request):

        if Device.objects.filter(pk=request.data['id'], owner_id=self.request.user.id).exists() is False:
            return Response({'status': 'error', 'message': 'forbidden'})

        device = Device.objects.get(pk=request.data['id'], owner_id=self.request.user.id)

        if device.firmwares.count() >= 5:
            return Response({'status': 'error', 'message': 'limit'})

        create_firmware(request.data['id'], self.request.user.id)
        serializer = DeviceSerializer(device)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request):

        if FirmwarePrograms.objects.filter(pk=request.query_params['id-firmware']).exists() is False:
            return Response({'status': 'error', 'message': 'forbidden'})

        firmware = FirmwarePrograms.objects.get(pk=request.query_params['id-firmware'])
        device = Device.objects.filter(pk=firmware.device_id, owner_id=self.request.user.id)

        if device.exists() is False:
            return Response({'status': 'error', 'message': 'forbidden'})

        firmware.delete()
        serializer = DeviceSerializer(Device.objects.get(pk=firmware.device_id, owner_id=self.request.user.id))

        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
