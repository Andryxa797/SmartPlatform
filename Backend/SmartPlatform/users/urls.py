from django.urls import path
from django.urls import re_path
from users import consumers, views

from users.views import MyProfileView, MyDevicesView, RetrieveUpdateDestroyDeviceView, CreateDeviceView

urlpatterns = [
    path('profile/', MyProfileView.as_view()),

    path('devices/', MyDevicesView.as_view()),
    path('device/', CreateDeviceView.as_view()),
    path('device/<int:id>', RetrieveUpdateDestroyDeviceView.as_view()),
]

websocket_urlpatterns = [
    re_path(r'ws/device/(?P<device_id>\w+)$', consumers.DeviceConsumer.as_asgi()),
]
