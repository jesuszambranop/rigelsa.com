# Guía de actualización

## Productos, stock y fichas técnicas

El inventario incluido en el modo HTML usa `js/data.js` y `js/inventario-bilingue.js`. Al ejecutar Python, el panel `/admin` utiliza la base SQLite y permite hacer los cambios con un formulario, sin editar código.

La forma más segura de actualizarlo con Codex es pedir, por ejemplo:

> En este repositorio, cambia la disponibilidad de la B45 a Disponible dentro de `js/inventario-bilingue.js` sin modificar el diseño ni añadir precios.

Para añadir un producto en el modo administrable, abre `/admin`, pulsa **Nuevo producto**, completa los textos y sube la imagen. El cambio aparece inmediatamente en Productos. Para distribuir posteriormente una nueva copia que también funcione sin Python, pide a Codex que sincronice la base con `backend/data/seed_products.json` y el catálogo JavaScript.

Estados disponibles para la gestión interna del panel (no se muestran en el catálogo público):

- `disponible`: disponible en la administración interna.
- `bajo-pedido`: gestionado bajo pedido en la administración interna.
- `no-disponible`: no disponible en la administración interna.

No hay campos de precio ni código de carrito.

## Blog

Los artículos en español están en `js/data.js` y sus versiones en inglés en `js/inventario-bilingue.js`.

Para publicar un artículo nuevo:

1. Guarda las imágenes en `assets/blog/numero-o-slug/`.
2. Pide a Codex que añada el artículo con título, extracto, categoría, imagen y secciones.
3. Pide que mantenga el formato de los artículos existentes y que no modifique el código del sitio.

No es necesario crear una página HTML por cada artículo: `articulo.html` carga el contenido según el parámetro `slug`.

## Logotipos de clientes

Los 29 logotipos oficiales están en `assets/clientes/` y aparecen en el carrusel ubicado al final de Inicio.

1. Copia cada logo en `assets/clientes/`, preferiblemente PNG, WebP o SVG con fondo transparente.
2. Abre `js/app.js` y localiza el arreglo `clientes` al principio del archivo.
3. Añade o sustituye un elemento así:

```js
{ nombre: "Nombre del cliente", imagen: "assets/clientes/nombre-del-cliente.png" }
```

El carrusel muestra varios logos completos a la vez y avanza exactamente una marca cada 1,8 segundos. Incluye controles anterior, pausa y siguiente; al pasar el cursor sobre la banda se detiene temporalmente. Las tarjetas usan `object-fit: contain` y márgenes internos para evitar cualquier recorte.

## Quiénes somos y preguntas frecuentes

La página bilingüe `quienes-somos.html` contiene la presentación internacional de Rigel, el mapa `assets/nosotros/mapa-presencia.png` y todas las preguntas frecuentes. El menú y el pie enlazan esta página; ya no existen páginas independientes de Clientes ni de Preguntas frecuentes.

## Slides principales

Los slides se encuentran en `assets/slides/`. Existen versiones de escritorio (`desktop-1.webp`) y móvil (`movil-1.webp`). Puedes reemplazarlas manteniendo exactamente los mismos nombres. En móvil se muestran completos, sin recortar los textos incorporados en la imagen.

## Diseño y contacto

- Estilos: `css/styles.css`.
- Comportamiento, idioma, navegación, filtros y carruseles: `js/app.js`.
- Formulario público: Google Forms, integrado dentro de `js/app.js`.
- Correo configurado: `ventas@rigelsa.com`.
- WhatsApp configurado: `+593 93 947 4695`.

El formulario envía directamente `NOMBRE`, `CORREO`, `WHATSAPP` y `MENSAJE` al Google Forms suministrado y a su Google Sheet vinculada. No necesita el backend Python ni inicio de sesión del visitante. Las etiquetas, indicaciones y confirmaciones se traducen automáticamente al cambiar entre español e inglés. No cambies el destino `formResponse` ni los nombres `entry.*` sin volver a obtenerlos desde Google Forms. Correo y WhatsApp permanecen disponibles como canales directos.

## Publicación

Antes de subir cambios a GitHub o al dominio, sigue `GUIA-PUBLICACION-GITHUB-Y-HOSTING.md`. La guía separa claramente la versión estática de la versión administrable y contiene un procedimiento de respaldo y restauración.
