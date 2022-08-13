from django.urls import path

from users.views import MyProfileView, MyDevicesView

urlpatterns = [
    path('profile/', MyProfileView.as_view()),
    path('devices/', MyDevicesView.as_view()),
]
