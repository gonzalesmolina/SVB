Comando para levantar el servidor
    - py manage.py runserver --settings=svb_backend.settings.dev

Comando para ejecutar las migraciones
    - py manage.py migrate --settings=svb_backend.settings.dev

Crear superusuario del admin de la aplicación
    - python manage.py createsuperuser --settings=svb_backend.settings.dev

Comando para ejecutar los tests
    - python manage.py test --settings=svb_backend.settings.dev