from rest_framework.generics import RetrieveUpdateAPIView, get_object_or_404, ListAPIView
from rest_framework.permissions import IsAuthenticated

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
