# Copia opcional de contactos en Google Sheets

El backend ya guarda los mensajes en SQLite y genera Excel, por lo que Google Sheets no es obligatorio. Si deseas duplicar cada mensaje en la hoja proporcionada, obtén una URL pública:

1. Abre la hoja `DATOS` con la cuenta propietaria.
2. Entra en **Extensiones > Apps Script**.
3. Reemplaza el contenido del editor por el archivo `Code.gs` de esta carpeta y guarda.
4. Pulsa **Implementar > Nueva implementación**.
5. Elige **Aplicación web**.
6. Configura **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier persona**.
7. Autoriza el acceso y copia la URL terminada en `/exec`.
8. En el hosting, guarda esa URL como variable `GOOGLE_SHEETS_WEBHOOK_URL`. Para el modo HTML sin Python, también puedes pegarla en `js/config.js` como `sheetEndpoint`.

Solo la cuenta propietaria realiza esta activación inicial. Los visitantes nunca inician sesión. La hoja recibe `FECHA Y HORA`, `NOMBRE`, `EMPRESA`, `CORREO` y `MENSAJE`; no se incluyen credenciales dentro del sitio.
