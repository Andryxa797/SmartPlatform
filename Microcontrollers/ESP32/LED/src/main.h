#ifndef MAIN_H
#define MAIN_H

#include <Arduino.h>
#include <WiFi.h>

#include "wi-fi/wi-fi.h"
#include "websocket/websocket.h"


#define websockets_host  "192.168.0.106"
#define websockets_port  8000
#define websockets_path  "/ws/device/2?uuid_public=|3f782d7e-acb5-4570-b961-7a59a917d3db|&uuid_private=|0c0ae833-7a51-44b7-9c66-74f67efb53b4|"

#define PASSWORD_WIFI "31670456"
#define SSID_WIFI "TP-LINK_1608"

#endif