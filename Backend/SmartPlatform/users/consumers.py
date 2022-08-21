import re
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from rest_framework_simplejwt import authentication

from users.models import Device


class DeviceConsumer(WebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_group_name = None
        self.room_name = None
        self.access = None
        self.refresh = None
        self.uuid_public = None
        self.uuid_private = None
        self.user = None
        self.device = None
        self.isDevice = None
        self.isUser = None

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['device_id']
        self.room_group_name = 'chat_%s' % self.room_name
        self.authentication()

        if self.device and self.user:
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()
        else:
            self.close()

    def disconnect(self, close_code):

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        # text_data_json = json.loads(text_data)
        # message = text_data_json['message']
        print(text_data)

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': text_data
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))

    def authentication(self):
        params = str(self.scope['query_string']).split("&")
        for param in params:
            if re.search("_access=", param):
                self.access = param.split("|")[1]
            if re.search("_refresh=", param):
                self.refresh = param.split("|")[1]
            if re.search("uuid_public=", param):
                self.uuid_public = param.split("|")[1]
            if re.search("uuid_private=", param):
                self.uuid_private = param.split("|")[1]

        if self.access and self.refresh:
            self.isUser = True

        if self.uuid_public and self.uuid_private:
            self.isDevice = True

        if self.isUser:
            validated_token = authentication.JWTAuthentication().get_validated_token(self.access)
            self.user = authentication.JWTAuthentication().get_user(validated_token)
            self.device = Device.objects.get(owner_id=self.user.id, pk=self.room_name)

        if self.isDevice:
            self.device = Device.objects.get(uuid_public=self.uuid_public, uuid_private=self.uuid_private)
            self.user = self.device.owner
            self.device = Device.objects.get(owner_id=self.user.id, pk=self.room_name)
