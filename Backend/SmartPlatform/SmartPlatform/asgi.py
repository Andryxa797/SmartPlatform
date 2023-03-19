import os

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

import firmware.urls

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SmartPlatform.settings')
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        URLRouter(
            firmware.urls.websocket_urlpatterns
        )
    ),
})
