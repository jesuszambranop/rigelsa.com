(function () {
  "use strict";

  function iniciarSitio() {
    var script = document.createElement("script");
    script.src = "js/app.js";
    script.defer = true;
    document.body.appendChild(script);
  }

  var config = window.RIGEL_CONFIG || {};
  var apiMode = config.apiMode || "auto";
  var esGitHubPages = /(^|\.)github\.io$/i.test(window.location.hostname);

  // GitHub Pages y el modo HTML son estáticos: se usa el catálogo local y se
  // evita una solicitud innecesaria a /api/products que respondería 404.
  if (window.location.protocol === "file:" || apiMode === "static" || (apiMode === "auto" && esGitHubPages)) {
    iniciarSitio();
    return;
  }

  window.fetch("/api/products", { credentials: "same-origin" })
    .then(function (response) {
      if (!response.ok) throw new Error("Inventario dinámico no disponible");
      return response.json();
    })
    .then(function (payload) {
      if (payload.productos && payload.productos.length) {
        window.RIGEL_DATA.productos = payload.productos;
        window.RIGEL_DATA.productosEn = payload.productosEn || payload.productos;
        window.RIGEL_BACKEND_ACTIVE = true;
      }
    })
    .catch(function () {
      window.RIGEL_BACKEND_ACTIVE = false;
    })
    .finally(iniciarSitio);
}());
