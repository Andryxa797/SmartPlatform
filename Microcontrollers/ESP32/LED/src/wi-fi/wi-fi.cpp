#include "wi-fi.h"
#include "main.h"

bool isWIFIConnected;

void wifiConnect()
{
    Serial.println("Connection");
    isWIFIConnected = false;

    Serial.println("SSID_WIFI:");
    Serial.println(SSID_WIFI);
    Serial.println("PASSWORD_WIFI:");
    Serial.println(PASSWORD_WIFI);

    #pragma message("SSID_WIFI PASSWORD_WIFI");
    #pragma message(SSID_WIFI);
    #pragma message(PASSWORD_WIFI);

    WiFi.begin(SSID_WIFI, PASSWORD_WIFI);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.println(".");
    }
    Serial.println("Yes - Connection");
}