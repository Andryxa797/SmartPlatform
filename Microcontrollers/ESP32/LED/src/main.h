#ifndef MAIN_H
#define MAIN_H

#include <Arduino.h>
#include <WiFi.h>

#include "wi-fi/wi-fi.h"
#include "websocket/websocket.h"

#ifndef PASSWORD_WIFI
#define PASSWORD_WIFI "31670456"
#endif

#ifndef SSID_WIFI
#define SSID_WIFI "TP-LINK_1608"
#endif

#ifndef WEBSOCKET_PATH
#define WEBSOCKET_PATH "/ws/device/2?uuid_public=|3f782d7e-acb5-4570-b961-7a59a917d3db|&uuid_private=|0c0ae833-7a51-44b7-9c66-74f67efb53b4|"
#endif

#define websockets_host  "192.168.0.106"
#define websockets_port  8000

#endif