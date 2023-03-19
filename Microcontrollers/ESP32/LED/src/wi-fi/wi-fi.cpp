#include "wi-fi.h"
#include "main.h"

bool isWIFIConnected;

void wifiConnect()
{
    Serial.println("Connection");
    isWIFIConnected = false;
    WiFi.begin(SSID_WIFI, PASSWORD_WIFI);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println(".");
    }
    Serial.println("Yes - Connection");
} 