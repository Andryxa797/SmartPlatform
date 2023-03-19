### Команда для запуска Reddis
docker run -p 6379:6379 -d redis:5

### Команда для запуска Celery
celery -A SmartPlatform worker -l info --pool=solo 
