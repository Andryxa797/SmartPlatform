from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, get_object_or_404, ListAPIView, RetrieveUpdateDestroyAPIView, \
    CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from users.models import Profile, Device
from users.permissions import IsOwnerProfileOrReadOnly
from users.serializers import ProfileSerializer, DeviceSerializer


class MyProfileView(RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerProfileOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj


class MyDevicesView(ListAPIView):
    permission_classes = [IsOwnerProfileOrReadOnly, IsAuthenticated]
    serializer_class = DeviceSerializer
    pagination_class = None

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Device.objects.filter(owner_id=self.request.user.id)


class RetrieveUpdateDestroyDeviceView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerProfileOrReadOnly, IsAuthenticated]
    serializer_class = DeviceSerializer

    def get_object(self):
        if self.request.user.is_authenticated:
            return Device.objects.get(pk=self.kwargs['id'], owner_id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        if len(Device.objects.filter(pk=self.kwargs['id'], owner_id=self.request.user.id)) == 0:
            return Response("Эта запись не существует", status=status.HTTP_404_NOT_FOUND)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        if len(Device.objects.filter(pk=self.kwargs['id'], owner_id=self.request.user.id)) == 0:
            return Response("Эта запись не существует", status=status.HTTP_404_NOT_FOUND)
        return self.destroy(request, *args, **kwargs)


class CreateDeviceView(CreateAPIView):
    permission_classes = [IsOwnerProfileOrReadOnly, IsAuthenticated]
    serializer_class = DeviceSerializer

    def perform_create(self, serializer):
        serializer.save(owner_id=self.request.user.id)
