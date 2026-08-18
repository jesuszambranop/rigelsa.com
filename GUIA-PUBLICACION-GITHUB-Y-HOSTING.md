# Guía sencilla para publicar la web de Rigel

Esta guía está escrita para realizar el proceso sin experiencia previa en programación web.

## 1. Qué funciona en cada lugar

| Función | GitHub Pages | Hosting solo HTML/PHP | Hosting con Python |
| --- | --- | --- | --- |
| Inicio, productos, blog y fichas | Sí | Sí | Sí |
| Español e inglés | Sí | Sí | Sí |
| Imágenes, PDF, videos y WhatsApp | Sí | Sí | Sí |
| Formulario conectado a Google Forms | Sí | Sí | Sí |
| Panel `/admin` | No | No | Sí |
| Cambiar inventario desde el panel | No | No | Sí |
| SQLite y carga de imágenes desde el panel | No | No | Sí |

GitHub Pages publica archivos estáticos. No ejecuta `backend/app.py`, SQLite ni el panel administrativo. La web pública usa el catálogo incluido en JavaScript y continúa funcionando sin Python.

## 2. Subir el repositorio con GitHub Desktop

GitHub Desktop es la ruta más sencilla porque este proyecto contiene más archivos de los que conviene cargar manualmente desde el navegador.

1. Crea o inicia sesión en una cuenta de GitHub.
2. Descarga e instala GitHub Desktop desde `https://desktop.github.com/`.
3. Descomprime el archivo entregado y conserva la carpeta completa `rigel-sa-web`.
4. Abre GitHub Desktop.
5. Entra en **File > Add local repository**.
6. Selecciona la carpeta `rigel-sa-web`, la que contiene `index.html` y este documento.
7. Pulsa **Add repository**.
8. Pulsa **Publish repository**.
9. Usa el nombre `rigel-sa-web`.
10. Mantén marcada la opción de repositorio privado si solo deseas respaldar el código.
11. Pulsa **Publish repository**.

El repositorio ya queda conectado. En adelante, GitHub Desktop mostrará los archivos modificados y permitirá guardarlos con **Commit to main** y subirlos con **Push origin**.

## 3. Activar una vista temporal con GitHub Pages

El repositorio ya incluye un flujo que publica únicamente el frontend. No expone la base SQLite, las variables privadas ni el panel como aplicación funcional.

1. Abre el repositorio en GitHub.
2. Entra en **Settings**.
3. En el menú izquierdo, abre **Pages**.
4. En **Build and deployment > Source**, selecciona **GitHub Actions**.
5. Abre la pestaña **Actions**.
6. Selecciona **Publicar frontend en GitHub Pages**.
7. Pulsa **Run workflow** y confirma.
8. Espera a que el proceso termine en color verde.
9. La dirección temporal aparecerá en el resultado del proceso y normalmente tendrá la forma `https://USUARIO.github.io/rigel-sa-web/`.

Si la cuenta usa GitHub Free, Pages está disponible gratuitamente para repositorios públicos. Para publicar Pages desde un repositorio privado se necesita un plan que incluya esa opción. Puedes mantener el repositorio privado y omitir Pages si solo deseas usar GitHub como respaldo.

## 4. Subir la versión estática al hosting de rigelsa.com

Esta es la opción recomendada si no necesitas modificar inventario desde `/admin`.

### Antes de cambiar nada

1. Entra al panel de tu hosting, normalmente cPanel.
2. Abre **Administrador de archivos**.
3. Localiza `public_html` o la carpeta raíz asignada a `rigelsa.com`.
4. Descarga una copia completa de esa carpeta.
5. Renombra la carpeta anterior o comprímela como respaldo, por ejemplo `respaldo-web-anterior-2026-08-18.zip`.

### Archivos que debes publicar

Sube a la raíz del dominio:

- Todos los archivos `.html` de la raíz.
- Las carpetas `assets`, `css` y `js`.
- `og.png`.

No subas el ZIP como una carpeta adicional. `index.html` debe quedar directamente dentro de `public_html`; no debe quedar como `public_html/rigel-sa-web/index.html`.

### Comprobación

1. Abre `https://rigelsa.com/` en una ventana privada.
2. Prueba Inicio, Productos, Blog, Preguntas y Contacto.
3. Abre al menos una ficha de producto y un PDF.
4. Cambia de español a inglés.
5. Envía un mensaje de prueba y confirma que llegue al Google Sheet vinculado.
6. Comprueba el sitio desde un celular.
7. Si ves la versión anterior, limpia la caché del hosting, del navegador y de cualquier CDN.

## 5. Publicar también el panel administrable en un hosting con Python

Hazlo únicamente si tu plan de hosting muestra una opción como **Setup Python App**, **Aplicación Python**, **Passenger** o **WSGI**.

1. En cPanel abre **Setup Python App**.
2. Elige Python 3.12 o una versión compatible con los requisitos del hosting.
3. Define la carpeta de la aplicación, por ejemplo `rigel_app`.
4. Selecciona el dominio `rigelsa.com` y la ruta `/`.
5. Usa `passenger_wsgi.py` como archivo de inicio y `application` como objeto de aplicación, si el panel solicita esos datos.
6. Sube el repositorio completo a la carpeta elegida.
7. Abre la terminal que cPanel muestra para la aplicación.
8. Ejecuta `pip install -r backend/requirements.txt`.
9. Configura estas variables desde el panel, sin escribir las claves dentro de GitHub:
   - `RIGEL_ADMIN_USER`: un usuario administrativo distinto de `admin`.
   - `RIGEL_ADMIN_PASSWORD`: una contraseña larga y única.
   - `RIGEL_ALLOW_LOCAL_DEFAULTS`: `0`.
   - `RIGEL_DATA_DIR`: una carpeta persistente y escribible del hosting.
   - `RIGEL_DATABASE`: ruta persistente para `rigel.sqlite3`.
   - `RIGEL_UPLOAD_DIR`: carpeta persistente para imágenes cargadas.
10. Reinicia la aplicación desde cPanel.
11. Prueba `https://rigelsa.com/api/health` y confirma que responda con `ok: true`.
12. Entra en `https://rigelsa.com/admin` con las credenciales configuradas.

Si el hosting no ofrece Python, no intentes instalar este backend dentro de un hosting únicamente PHP. Publica la versión estática y utiliza Google Forms para los contactos.

## 6. Seguridad imprescindible

- Nunca subas un archivo `.env` a GitHub.
- No uses `admin` / `rigel-admin` en el dominio real. Esa combinación funciona únicamente en localhost para facilitar las pruebas.
- Activa HTTPS antes de utilizar el panel.
- Mantén copias de la base SQLite y de la carpeta de imágenes.
- No cambies la URL `formResponse` ni los campos `entry.*` del formulario sin actualizar también el Google Form.

## 7. Volver a la web anterior si algo falla

1. Vacía o renombra la nueva carpeta publicada.
2. Restaura el ZIP o la carpeta de respaldo creada antes del cambio.
3. Confirma que `index.html` vuelva a estar directamente en la raíz del dominio.
4. Limpia la caché y prueba en una ventana privada.

## 8. Validación automática

Antes de cada publicación puedes ejecutar:

```bash
python scripts/validate_site.py
pip install -r backend/requirements.txt
python scripts/test_backend.py
```

GitHub repite estas comprobaciones automáticamente en cada actualización del repositorio.
