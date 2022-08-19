from django.urls import path

from users.views import MyProfileView, MyDevicesView, RetrieveUpdateDestroyDeviceView, CreateDeviceView

urlpatterns = [
    path('profile/', MyProfileView.as_view()),
    path('devices/', MyDevicesView.as_view()),
    path('device/', CreateDeviceView.as_view()),
    path('device/<int:id>', RetrieveUpdateDestroyDeviceView.as_view()),
]
