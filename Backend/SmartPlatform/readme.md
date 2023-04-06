### Команда для запуска Reddis
`docker run -p 6379:6379 -d redis:5`

### Команда для запуска Celery
`celery -A SmartPlatform worker -l info --pool=solo `

esptool.py --chip esp32 --baud 921600 --before default_reset --after hard_reset write_flash -z --flash_freq 40m --flash_size detect 0x1000 esp32doit-devkit-v1/bootloader.bin 0x8000 esp32doit-devkit-v1/partitions.bin 0x10000 esp32doit-devkit-v1/firmware.bin

esptool.py --chip esp32 --baud 921600 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size 4MB 0x1000 esp32doit-devkit-v1/bootloader.bin 0x8000 esp32doit-devkit-v1/partitions.bin 0x10000 esp32doit-devkit-v1/firmware.bin
