#include "websocket.h"

String deserializeWebsocketsMessage(WebsocketsMessage message)
{
    StaticJsonDocument<300> parsed;
    DeserializationError error = deserializeJson(parsed, message.c_str());
    if (error)
    {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return "";
    }
    return parsed["message"];
}

void websocketConnect(WebsocketsClient &client, MessageCallback callbackMessage, PartialEventCallback callbackEvent)
{
    bool connected = client.connect(websockets_host, websockets_port, websockets_path);
    if (connected)
    {
        client.send("device connect");
        client.send("OK");
    }
    client.onMessage(callbackMessage);
    client.onEvent(callbackEvent);
    client.ping();
    Serial.println("Correct initialization has occurred!");
}

void websocketLoop(WebsocketsClient &client, MessageCallback callbackMessage, PartialEventCallback callbackEvent, WebsocketConnectEnum stationConnect)
{
  client.poll();
  if (stationConnect == WebsocketConnectEnum::Close)
  {
    Serial.println("Start socket reconnect");
    websocketConnect(client, callbackMessage, callbackEvent);
  }
}
