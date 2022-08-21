#include "main.h"

using namespace websockets;

WebsocketsClient client;
WebsocketConnectEnum stationConnect = WebsocketConnectEnum::Init;

const int ledPin = 23;

void onEventsCallback(WebsocketsEvent event, String data)
{
  if (event == WebsocketsEvent::ConnectionOpened)
  {
    stationConnect = WebsocketConnectEnum::Open;
    Serial.println("Connect: Opened");
  }
  else if (event == WebsocketsEvent::ConnectionClosed)
  {
    stationConnect = WebsocketConnectEnum::Close;
    Serial.println("Connect: Closed");
  }
  else if (event == WebsocketsEvent::GotPing)
    stationConnect = WebsocketConnectEnum::Ping;
}

void onMessageCallback(WebsocketsClient &, WebsocketsMessage mess)
{
  String message = deserializeWebsocketsMessage(mess);
  Serial.println(message);
  if (message == "user connect")
  {
    client.send("device connect");
    client.send("OK");
  }
  if (message == "ON")
  {
    digitalWrite(ledPin, HIGH);
    client.send("OK");
  }
  if (message == "OFF")
  {
    digitalWrite(ledPin, LOW);
    client.send("OK");
  }
}

void setup()
{
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  wifiConnect();
  client = websocketConnect(client, onMessageCallback, onEventsCallback);
}

void loop()
{
  websocketLoop(client, onMessageCallback, onEventsCallback, stationConnect);
}

