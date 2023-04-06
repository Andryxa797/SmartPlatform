import fileinput
import os
import shutil
from datetime import datetime

from celery import shared_task

from firmware.models import FirmwarePrograms
from users.models import Device
from django.core.files import File


def get_path_by_type(type):
    if type == "LED":
        return os.path.join('..', '..', 'Microcontrollers', 'ESP32', 'LED')

    return "Unknown type"


variables_h = """
#ifndef VARIABLES_H
#define VARIABLES_H

#define WEBSOCKET_HOST  "192.168.137.1"
#define WEBSOCKET_PORT  8000
#define WEBSOCKET_PATH  "/ws/device/2?uuid_public=|620c5fa2-75ef-42ed-af09-7c1e6a802b6e|&uuid_private=|55248db7-74a4-4b9b-aad4-e93871b78a38|"

#define PASSWORD_WIFI  "12345678"
#define SSID_WIFI  "TP_Link1602"


#endif
"""


def redefine_variable_h(file_path, ssid_wifi, wifi_password, device_id, uuid_public, uuid_private):
    with open(file_path, 'w') as f:
        f.write(variables_h)

    with fileinput.FileInput(file_path, inplace=True) as file:
        for line in file:
            if 'SSID_WIFI' in line:
                line = f'#define SSID_WIFI  "{ssid_wifi}"\n'
            if 'WEBSOCKET_PATH' in line:
                line = f'#define WEBSOCKET_PATH  "/ws/device/{device_id}?uuid_public=|{uuid_public}|&uuid_private=|{uuid_private}|"\n'
            if 'PASSWORD_WIFI' in line:
                line = f'#define PASSWORD_WIFI  "{wifi_password}"\n'
            if 'PASSWORD_WIFI' in line:
                line = f'#define PASSWORD_WIFI  "{wifi_password}"\n'
            print(line, end='')


current_dir = os.getcwd()


@shared_task
def create_firmware(device_id, firmware_id):
    device = Device.objects.get(pk=device_id)
    firmware = FirmwarePrograms.objects.get(pk=firmware_id)

    path_by_type = get_path_by_type(device.type.name)

    if path_by_type == "Unknown type":
        firmware.status = 'error'
        firmware.save()
        return TypeError('Неизвестный тип')

    try:
        target_dir = os.path.join(current_dir, path_by_type)
        os.chdir(target_dir)

        file_path = os.path.join(target_dir, 'src', 'variables.h')
        redefine_variable_h(file_path, device.wifi_name, device.wifi_password, device.id, device.uuid_public,
                            device.uuid_private)
        os.system('pio run')

        pio_dir = os.path.join(target_dir, '.pio')
        os.chdir(pio_dir)

        build_dir = os.path.join(pio_dir, 'build')
        shutil.make_archive('build', 'zip', build_dir)

        zip_file = os.path.join(pio_dir, 'build.zip')

        if os.path.exists(zip_file):
            with open(zip_file, 'rb') as f:
                firmware.programm.save(os.path.basename(zip_file), File(f), save=True)
        firmware.status = 'success'
        firmware.save()

        os.remove(zip_file)
        os.chdir(current_dir)

    except Exception:
        firmware.status = 'error'
        firmware.save()
