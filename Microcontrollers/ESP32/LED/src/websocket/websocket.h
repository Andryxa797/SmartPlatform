#ifndef WEBSOCKET_H
#define WEBSOCKET_H
#include "main.h"

#include <Arduino.h>
#include <ArduinoJson.h>
#include <ArduinoWebsockets.h>

using namespace websockets;

enum WebsocketConnectEnum {
    Init = 1,
    Close = 2,
    Open = 3,
    Ping = 4
};

String deserializeWebsocketsMessage(WebsocketsMessage message);
WebsocketsClient websocketConnect(WebsocketsClient client, MessageCallback callbackMessage, PartialEventCallback callbackEvent);
void websocketLoop(WebsocketsClient client, MessageCallback callbackMessage, PartialEventCallback callbackEvent, WebsocketConnectEnum stationConnect);

#endif