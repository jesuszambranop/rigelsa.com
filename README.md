# Sitio web Rigel bilingüe y administrable

Repositorio en HTML, CSS, JavaScript y Python. Mantiene el diseño aprobado, no contiene precios, carrito ni pagos, e incluye español e inglés.

## Dos formas de usarlo

### Catálogo HTML directo

Extrae el ZIP y abre `index.html`. Las páginas, filtros, fichas, videos, enlaces sociales, WhatsApp y carruseles funcionan sin instalar nada.

### Sitio administrable local

En Windows, haz doble clic en `iniciar_backend.bat`. La primera ejecución instala las dependencias y después habilita:

- Sitio: `http://127.0.0.1:5000/`
- Administración: `http://127.0.0.1:5000/admin`
- Usuario local inicial: `admin`
- Contraseña local inicial: `rigel-admin`

Estas credenciales solo se permiten en `localhost`. En un hosting, el backend bloquea la administración hasta definir `RIGEL_ADMIN_USER` y `RIGEL_ADMIN_PASSWORD`.

## GitHub y publicación

- El repositorio puede guardarse completo en GitHub.
- GitHub Pages publica el frontend estático: páginas, catálogo, idiomas, imágenes, PDF, WhatsApp y Google Forms.
- GitHub Pages no ejecuta Python, SQLite ni `/admin`.
- El flujo `Publicar frontend en GitHub Pages` genera una publicación que contiene únicamente HTML, CSS, JavaScript y recursos públicos.
- Consulta `GUIA-PUBLICACION-GITHUB-Y-HOSTING.md` para el proceso completo con GitHub Desktop, GitHub Pages y cPanel.

## Comprobaciones

```bash
python scripts/validate_site.py
pip install -r backend/requirements.txt
python scripts/test_backend.py
```

GitHub ejecuta estas validaciones automáticamente en cada actualización.

## Administración

El panel permite:

- Cambiar un producto entre Disponible, Bajo pedido y No disponible.
- Registrar una cantidad opcional de stock.
- Agregar o editar codificadoras, cartuchos y accesorios mediante formulario.
- Subir una imagen principal y una galería.
- Editar textos, características y especificaciones en ambos idiomas.
- Mantener una tabla local opcional para integraciones que usen la API Python.

El inventario administrable se guarda en `backend/data/rigel.sqlite3`. El formulario público no depende de esta base: se envía directamente al Google Forms proporcionado.

## Contenido incluido

- Inicio, Productos y Clientes en páginas independientes.
- 17 productos bilingües, incluida la Codificadora industrial UKCM K600.
- Catálogo público con búsqueda y filtros de tipo y altura, sin mostrar estados ni cantidades de stock.
- Imágenes mostradas completas mediante `object-fit: contain`.
- Favicon cuadrado oficial proporcionado.
- Burbuja permanente de WhatsApp a `wa.me/593939474695`.
- Facebook, Instagram, TikTok, YouTube y LinkedIn de Rigel.
- Carrusel principal y carrusel de clientes automáticos, uno por uno.
- Blog y fichas de producto dinámicas.

## Google Forms y Google Sheets

La página `contacto.html` usa exactamente el destino y los identificadores de campo del archivo `contacto-google-forms.html` suministrado. Los campos Nombre, Correo, WhatsApp y Mensaje se envían directamente a Google Forms y, por tanto, a su hoja vinculada. El formulario, sus ayudas y sus mensajes de confirmación cambian por completo entre español e inglés con el selector de idioma. Funciona también al abrir el sitio como HTML directo; solo requiere conexión a Internet. El botón de WhatsApp permanece disponible.

## Archivos principales

- `js/data.js` e `js/inventario-bilingue.js`: catálogo estático incluido en el ZIP.
- `backend/data/seed_products.json`: catálogo inicial del backend.
- `backend/app.py`: API y administración del inventario.
- `backend/admin.html`: formulario para productos y stock.
- `GUIA-DE-ACTUALIZACION.md`: mantenimiento cotidiano.
- `GUIA-PUBLICACION-GITHUB-Y-HOSTING.md`: publicación paso a paso.
- `passenger_wsgi.py`: punto de entrada para hostings cPanel/Passenger.
