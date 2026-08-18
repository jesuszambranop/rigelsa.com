// Pega aquí la URL del despliegue de Google Apps Script incluida en la carpeta
// google-apps-script. No incluyas credenciales ni claves privadas.
window.RIGEL_CONFIG = {
  sheetEndpoint: "",
  // "auto": usa la API cuando existe y el catálogo local cuando no existe.
  // "static": no intenta consultar el backend; es útil en hosting solo HTML.
  apiMode: "auto"
};
