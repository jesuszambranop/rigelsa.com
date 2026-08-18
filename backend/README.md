# Backend administrable de Rigel

Este backend sirve la misma página HTML y añade inventario persistente en SQLite. El formulario público de contacto se envía directamente a Google Forms y no necesita este backend.

## Inicio local

En Windows, haz doble clic en `iniciar_backend.bat`. La primera ejecución instala las dependencias y luego abre el servidor en:

- Sitio: `http://127.0.0.1:5000/`
- Administración: `http://127.0.0.1:5000/admin`

Acceso exclusivamente local inicial:

- Usuario: `admin`
- Contraseña: `rigel-admin`

La combinación anterior solo se acepta cuando el sitio se abre mediante `localhost`. En producción, si no se definen `RIGEL_ADMIN_USER` y `RIGEL_ADMIN_PASSWORD`, el panel responde con error 503 y permanece bloqueado.

## Funciones

- Conserva una API y tabla local opcional de contactos para integraciones futuras.
- Permite agregar y editar productos, cartuchos y accesorios.
- Controla `Disponible`, `Disponible bajo pedido`, `No disponible` y una cantidad opcional de stock.
- Permite subir imágenes desde el formulario administrativo y servirlas desde `/media/`.
- Actualiza el inventario público sin editar JavaScript.

## Publicación

El repositorio incluye `requirements.txt` y `Procfile`, compatibles con servicios Python que admitan Gunicorn. Configura:

- Comando de instalación: `pip install -r backend/requirements.txt`
- Comando de inicio: `gunicorn --chdir backend app:app`
- Carpeta persistente para `RIGEL_DATA_DIR` si el proveedor ofrece disco persistente. Dentro se guardan la base y las imágenes cargadas.
- Variables obligatorias en producción: `RIGEL_ADMIN_USER` y `RIGEL_ADMIN_PASSWORD`.
- Variable de seguridad en producción: `RIGEL_ALLOW_LOCAL_DEFAULTS=0`.
- Activa HTTPS en el dominio para proteger el acceso administrativo y los formularios.

En cPanel/Passenger se incluye `passenger_wsgi.py`. Consulta `../GUIA-PUBLICACION-GITHUB-Y-HOSTING.md` antes de cambiar el dominio.

El frontend y la API deben publicarse juntos para administrar el inventario. Abrir `index.html` directamente mantiene el catálogo y el envío a Google Forms; únicamente el panel de productos y stock requiere ejecutar Python.

## API local opcional

El endpoint `/api/contact` y las exportaciones locales se conservan para integraciones futuras, pero el formulario visible del sitio utiliza directamente el Google Forms suministrado.
