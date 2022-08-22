#include "main.h"

using namespace websockets;

WebsocketsClient client;
WebsocketConnectEnum stationConnect = WebsocketConnectEnum::Init;

const int ledPinD18 = 18;
const int ledPinD19 = 19;
const int ledPinD21 = 21;

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

void flash(int pin, int duration)
{
  digitalWrite(pin, HIGH);
  delay(duration);
  digitalWrite(pin, LOW);
  delay(duration);
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
  if (message == "ON_D18")
  {
    digitalWrite(ledPinD18, HIGH);
    client.send("OK");
  }
  if (message == "ON_D19")
  {
    digitalWrite(ledPinD19, HIGH);
    client.send("OK");
  }
  if (message == "ON_D21")
  {
    digitalWrite(ledPinD21, HIGH);
    client.send("OK");
  }
  if (message == "OFF_D18")
  {
    digitalWrite(ledPinD18, LOW);
    client.send("OK");
  }
  if (message == "OFF_D19")
  {
    digitalWrite(ledPinD19, LOW);
    client.send("OK");
  }
  if (message == "OFF_D21")
  {
    digitalWrite(ledPinD21, LOW);
    client.send("OK");
  }
  if (message == "SOS")
  {
    flash(ledPinD19, 200);
    flash(ledPinD19, 200);
    flash(ledPinD19, 200);
    delay(300);
    flash(ledPinD19, 500);
    flash(ledPinD19, 500);
    flash(ledPinD19, 500);
    flash(ledPinD19, 200);
    flash(ledPinD19, 200);
    flash(ledPinD19, 200);
    client.send("OK");
  }
  if (message == "SONG")
  {
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD19, LOW);
    digitalWrite(ledPinD21, LOW);
    digitalWrite(ledPinD18, HIGH);
    digitalWrite(ledPinD21, HIGH);
    delay(300);
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD21, LOW);
    delay(100);
    digitalWrite(ledPinD18, HIGH);
    digitalWrite(ledPinD21, HIGH);
    delay(300);
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD21, LOW);
    delay(100);
    digitalWrite(ledPinD19, HIGH);
    delay(500);
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD19, LOW);
    digitalWrite(ledPinD21, LOW);

    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD19, LOW);
    digitalWrite(ledPinD21, LOW);
    digitalWrite(ledPinD18, HIGH);
    digitalWrite(ledPinD21, HIGH);
    delay(300);
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD21, LOW);
    delay(100);
    digitalWrite(ledPinD18, HIGH);
    digitalWrite(ledPinD21, HIGH);
    delay(300);
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD21, LOW);
    delay(100);
    digitalWrite(ledPinD18, HIGH);
    digitalWrite(ledPinD21, HIGH);
    delay(300);
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD21, LOW);
    delay(100);
    digitalWrite(ledPinD19, HIGH);
    delay(500);
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD19, LOW);
    digitalWrite(ledPinD21, LOW);
    client.send("OK");
  }
  if (message == "FAST_SNAKE")
  {
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD19, LOW);
    digitalWrite(ledPinD21, LOW);
    for (int i = 0; i < 5; i++)
    {
      digitalWrite(ledPinD18, HIGH);
      delay(100);
      digitalWrite(ledPinD18, LOW);
      delay(100);
      digitalWrite(ledPinD19, HIGH);
      delay(100);
      digitalWrite(ledPinD19, LOW);
      delay(100);
      digitalWrite(ledPinD21, HIGH);
      delay(100);
      digitalWrite(ledPinD21, LOW);
      delay(100);
    }
    client.send("OK");
  }
  if (message == "SLOW_SNAKE")
  {
    digitalWrite(ledPinD18, LOW);
    digitalWrite(ledPinD19, LOW);
    digitalWrite(ledPinD21, LOW);
    for (int i = 0; i < 5; i++)
    {
      digitalWrite(ledPinD18, HIGH);
      delay(300);
      digitalWrite(ledPinD18, LOW);
      delay(300);
      digitalWrite(ledPinD19, HIGH);
      delay(300);
      digitalWrite(ledPinD19, LOW);
      delay(300);
      digitalWrite(ledPinD21, HIGH);
      delay(300);
      digitalWrite(ledPinD21, LOW);
      delay(300);
    }
    client.send("OK");
  }
}

void setup()
{
  Serial.begin(115200);
  pinMode(ledPinD18, OUTPUT);
  pinMode(ledPinD19, OUTPUT);
  pinMode(ledPinD21, OUTPUT);
  wifiConnect();
  websocketConnect(client, onMessageCallback, onEventsCallback);
}

void loop()
{
  websocketLoop(client, onMessageCallback, onEventsCallback, stationConnect);
}
