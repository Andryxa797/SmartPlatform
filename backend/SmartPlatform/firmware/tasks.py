import os
import shutil
from datetime import datetime
from firmware.models import FirmwarePrograms
from users.models import Device
from django.core.files import File


def get_path_by_type(type):
    if type == "LED":
        return '..\\..\\microcontrollers\\ESP32\\LED'

    return "Unknown type"


def get_pio_command(device):
    device_id = device.id
    public = device.uuid_public
    private = device.uuid_private

    wifi_password = "PASSWORD_WIFI=\"{}\"".format(device.wifi_password)
    wifi_name = "SSID_WIFI=\"{}\"".format(device.wifi_name)
    websocket_path = "WEBSOCKET_PATH=\"/ws/device/{}?uuid_public=^|{}^|^&uuid_private=^|{}^|\"".format(device_id,
                                                                                                       public,
                                                                                                       private)
    return "set {} && set {} && set {} && pio run".format(wifi_password, wifi_name, websocket_path)


current_dir = os.getcwd()


# @shared_task
def create_firmware(device_id, user_id):
    device = Device.objects.get(pk=device_id)

    path_by_type = get_path_by_type(device.type.name)
    if path_by_type == "Unknown type":
        return TypeError('Неизвестный тип')

    target_dir = os.path.join(current_dir, path_by_type)
    os.chdir(target_dir)

    command = get_pio_command(device)
    os.system(command)

    pio_dir = os.path.join(target_dir, '.pio')
    os.chdir(pio_dir)

    build_dir = os.path.join(pio_dir, 'build')
    shutil.make_archive('build', 'zip', build_dir)

    zip_file = os.path.join(pio_dir, 'build.zip')

    firmware = FirmwarePrograms()
    firmware.success = True
    firmware.create_date = datetime.now()
    firmware.device = device

    if os.path.exists(zip_file):
        with open(zip_file, 'rb') as f:
            firmware.programm.save(os.path.basename(zip_file), File(f), save=True)
    firmware.save()

    os.remove(zip_file)
    os.chdir(current_dir)
