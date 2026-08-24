(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var lang = params.get("lang") === "en" ? "en" : "es";
  var data = window.RIGEL_DATA || { productos: [], articulos: [] };
  var productos = lang === "en" ? (data.productosEn || data.productos) : data.productos;
  var articulos = lang === "en" ? (data.articulosEn || data.articulos) : data.articulos;
  var contenido = document.getElementById("contenido");
  var whatsapp = "https://wa.me/593939474695";
  var correo = "ventas@rigelsa.com";
  var redes = [
    { nombre: "Facebook", enlace: "https://www.facebook.com/Rigel.ec/", icono: "facebook.svg" },
    { nombre: "Instagram", enlace: "https://www.instagram.com/rigel.ecuador", icono: "instagram.svg" },
    { nombre: "TikTok", enlace: "https://www.tiktok.com/@rigel.ecuador", icono: "tiktok.svg" },
    { nombre: "YouTube", enlace: "https://www.youtube.com/@Rigel.International", icono: "youtube.svg" },
    { nombre: "LinkedIn", enlace: "https://www.linkedin.com/company/rigelsa/", icono: "linkedin.svg" }
  ];

  document.documentElement.lang = lang;

  var texto = {
    es: {
      skip: "Ir al contenido", home: "Inicio", products: "Productos", about: "Quiénes somos", clients: "Clientes", faq: "Preguntas frecuentes", blog: "Blog", support: "Soporte",
      advice: "Asesoría especializada", adviceText: "para elegir el equipo correcto.", technical: "Soporte técnico", technicalText: "antes y después de la implementación.", coverage: "Cobertura internacional", coverageText: "para proyectos de codificación.",
      footerText: "Soluciones de marcaje y codificación manual y automática para productos, empaques y líneas de producción.", contactUs: "Contáctanos", printers: "Codificadoras", cartridges: "Cartuchos", accessories: "Accesorios", contact: "Contacto",
      heroAlt: ["Soluciones Rigel para codificación industrial", "Codificación portátil sobre diferentes superficies", "Equipos Rigel para líneas de producción"],
      heroEyebrow: "MARCAJE Y CODIFICACIÓN", heroTitle: "Soluciones que avanzan al ritmo de tu producción", heroText: "Equipos portátiles, automáticos e industriales para imprimir fechas, lotes, códigos, textos y logotipos sobre múltiples superficies.", seeProducts: "Ver productos", quote: "Cotiza con nosotros",
      applicationsEyebrow: "UNA SOLUCIÓN PARA CADA PROCESO", applicationsTitle: "Del marcaje manual a la línea automatizada", applicationsText: "Elige por altura, velocidad, superficie y volumen de producción. Cada producto dispone de características técnicas claras y asesoría directa.",
      portable: "Portátiles", portableText: "Equipos ligeros para trabajar en distintos espacios y superficies.", automatic: "Automatización", automaticText: "Codificadoras, sensores y bandas para producción continua.", industrial: "Industrial", industrialText: "Soluciones de alta velocidad para líneas exigentes.",
      knowledge: "CONOCIMIENTO RIGEL", guides: "Guías para codificar mejor", allArticles: "Ver todos los artículos", read: "Leer artículo",
      inventory: "INVENTARIO RIGEL", inventoryTitle: "Productos para cada escala de producción", inventoryText: "Consulta equipos, consumibles y accesorios. Filtra por tipo y altura de impresión.",
      search: "Buscar por modelo o aplicación", searchPlaceholder: "Ej.: UKCM K600, industrial, cartucho…", availability: "Disponibilidad", all: "Todos", available: "Disponible", onRequest: "Bajo pedido", unavailable: "No disponible", stock: "Stock", height: "Altura de impresión", allHeights: "Todas", results: "resultados", oneResult: "resultado", noResults: "No encontramos coincidencias", tryAgain: "Prueba otra búsqueda o restablece los filtros.", reset: "Restablecer filtros", viewFeatures: "Ver características",
      clientsEyebrow: "NUESTROS CLIENTES", clientsTitle: "Marcas que confían en Rigel", clientPrevious: "Cliente anterior", clientNext: "Cliente siguiente", clientPause: "Pausar carrusel", clientPlay: "Reanudar carrusel",
      aboutEyebrow: "RIGEL INTERNACIONAL", aboutTitle: "Quiénes somos", aboutParagraphOne: "Somos una empresa dedicada a la venta de equipos de marcaje y codificación. Ofrecemos soluciones tecnológicas innovadoras para pequeñas, medianas y grandes empresas, con enfoque en productos de alta calidad y respeto por el medio ambiente.", aboutParagraphTwo: "Nuestra empresa fue fundada en Ecuador y tiene presencia en Brasil, Colombia, Venezuela, Chile y México. Contamos con más de siete años de experiencia en el mercado de impresoras de codificación.", aboutMapAlt: "Mapa de presencia de Rigel en América Latina",
      breadcrumbHome: "Inicio", breadcrumbProducts: "Productos", information: "INFORMACIÓN TÉCNICA", features: "Características", includes: "Incluye", sheet: "Abrir ficha técnica", consultProduct: "Cotiza con nosotros", demonstration: "DEMOSTRACIÓN", watchWorking: "Mira el equipo en funcionamiento", youtube: "Ver video público en YouTube", related: "COMPATIBLES Y RELACIONADOS", completeSolution: "Completa tu solución", directAdvice: "ASESORÍA DIRECTA", talkModel: "¿Necesitas este modelo?", talkModelText: "Escríbenos por WhatsApp y te ayudaremos a confirmar el equipo, cartucho y configuración adecuados.",
      blogEyebrow: "CONOCIMIENTO RIGEL", blogTitle: "Ideas para una codificación más eficiente", blogText: "Guías prácticas sobre equipos, tintas, trazabilidad, mantenimiento y buenas prácticas de producción.", keepReading: "SEGUIR LEYENDO", otherArticles: "Otros artículos", needAdvice: "¿NECESITAS ASESORÍA?", findPrinter: "Encuentra la solución adecuada", findPrinterText: "Revisa el inventario o cuéntanos tu proceso de impresión.",
      faqEyebrow: "SOPORTE", faqTitle: "Preguntas frecuentes", faqText: "Información esencial para utilizar, mantener e integrar tu solución de codificación.", stillQuestions: "¿Todavía tienes dudas?", stillQuestionsText: "Cuéntanos qué equipo utilizas y qué necesitas resolver.",
      contactEyebrow: "CONTACTO", contactTitle: "Hablemos de tu proceso de codificación", contactText: "Recibe asesoría para elegir un modelo, confirmar compatibilidad o resolver una consulta técnica.", personalized: "ATENCIÓN PERSONALIZADA", supportTitle: "Soporte Rigel", supportText: "Describe el producto, la superficie y la información que necesitas imprimir. También puedes indicar el volumen aproximado de producción.", email: "Correo", channel: "Canal", name: "Nombre completo", message: "¿Cómo podemos ayudarte?", phone: "WhatsApp", send: "Enviar mensaje", formKicker: "FORMULARIO DE CONTACTO", formTitle: "Cuéntanos cómo podemos ayudarte", formRequired: "Todos los campos son obligatorios.", namePlaceholder: "Escribe tu nombre", emailPlaceholder: "nombre@empresa.com", phonePlaceholder: "+593 99 999 9999", messagePlaceholder: "Escribe aquí tu mensaje o requerimiento…", formNote: "Al enviar este formulario aceptas que usemos tus datos únicamente para responder tu solicitud.", sending: "Enviando…", received: "MENSAJE RECIBIDO", thankYou: "Gracias por contactarnos.", sent: "Tu información fue enviada correctamente a Rigel.", sendAnother: "Enviar otro mensaje", required: "Completa los campos obligatorios.",
      notFound: "Contenido no encontrado", backProducts: "Volver a productos", backBlog: "Volver al blog"
    },
    en: {
      skip: "Skip to content", home: "Home", products: "Products", about: "About us", clients: "Clients", faq: "Frequently asked questions", blog: "Blog", support: "Support",
      advice: "Specialized guidance", adviceText: "to choose the right equipment.", technical: "Technical support", technicalText: "before and after implementation.", coverage: "International coverage", coverageText: "for coding projects.",
      footerText: "Manual and automatic marking and coding solutions for products, packaging and production lines.", contactUs: "Contact us", printers: "Coding printers", cartridges: "Ink cartridges", accessories: "Accessories", contact: "Contact",
      heroAlt: ["Rigel industrial coding solutions", "Handheld coding on different materials", "Rigel equipment for production lines"],
      heroEyebrow: "MARKING & CODING", heroTitle: "Solutions that keep pace with your production", heroText: "Handheld, automatic and industrial equipment for dates, batches, codes, text and logos on multiple materials.", seeProducts: "View products", quote: "Request a quote",
      applicationsEyebrow: "A SOLUTION FOR EVERY PROCESS", applicationsTitle: "From handheld marking to automated lines", applicationsText: "Choose by height, speed, material and production volume. Every product includes clear technical details and direct guidance.",
      portable: "Handheld", portableText: "Lightweight equipment for different spaces and materials.", automatic: "Automation", automaticText: "Printers, sensors and conveyors for continuous production.", industrial: "Industrial", industrialText: "High-speed solutions for demanding production lines.",
      knowledge: "RIGEL KNOWLEDGE", guides: "Guides for better coding", allArticles: "View all articles", read: "Read article",
      inventory: "RIGEL INVENTORY", inventoryTitle: "Products for every production scale", inventoryText: "Browse equipment, consumables and accessories. Filter by type and print height.",
      search: "Search by model or application", searchPlaceholder: "E.g. UKCM K600, industrial, cartridge…", availability: "Availability", all: "All", available: "Available", onRequest: "On request", unavailable: "Unavailable", stock: "Stock", height: "Print height", allHeights: "All", results: "results", oneResult: "result", noResults: "No matches found", tryAgain: "Try a different search or reset the filters.", reset: "Reset filters", viewFeatures: "View features",
      clientsEyebrow: "OUR CLIENTS", clientsTitle: "Brands that trust Rigel", clientPrevious: "Previous client", clientNext: "Next client", clientPause: "Pause carousel", clientPlay: "Resume carousel",
      aboutEyebrow: "RIGEL INTERNATIONAL", aboutTitle: "About us", aboutParagraphOne: "We are a company dedicated to supplying marking and coding equipment. We offer innovative technology solutions for small, medium and large businesses, focused on high-quality products and respect for the environment.", aboutParagraphTwo: "Our company was founded in Ecuador and has a presence in Brazil, Colombia, Venezuela, Chile and Mexico. We have more than seven years of experience in the coding printer market.", aboutMapAlt: "Map of Rigel's presence in Latin America",
      breadcrumbHome: "Home", breadcrumbProducts: "Products", information: "TECHNICAL INFORMATION", features: "Features", includes: "Included", sheet: "Open technical data sheet", consultProduct: "Request a quote", demonstration: "DEMONSTRATION", watchWorking: "See the equipment in action", youtube: "Watch the public video on YouTube", related: "COMPATIBLE & RELATED", completeSolution: "Complete your solution", directAdvice: "DIRECT GUIDANCE", talkModel: "Need this model?", talkModelText: "Message us on WhatsApp and we will help you confirm the right equipment, cartridge and setup.",
      blogEyebrow: "RIGEL KNOWLEDGE", blogTitle: "Ideas for more efficient coding", blogText: "Practical guides about equipment, inks, traceability, maintenance and production best practices.", keepReading: "KEEP READING", otherArticles: "More articles", needAdvice: "NEED GUIDANCE?", findPrinter: "Find the right solution", findPrinterText: "Browse the inventory or tell us about your printing process.",
      faqEyebrow: "SUPPORT", faqTitle: "Frequently asked questions", faqText: "Essential information for using, maintaining and integrating your coding solution.", stillQuestions: "Still have questions?", stillQuestionsText: "Tell us which equipment you use and what you need to solve.",
      contactEyebrow: "CONTACT", contactTitle: "Let’s talk about your coding process", contactText: "Get guidance to choose a model, confirm compatibility or solve a technical question.", personalized: "PERSONALIZED ASSISTANCE", supportTitle: "Rigel support", supportText: "Describe the product, material and information you need to print. You can also include your approximate production volume.", email: "Email", channel: "Channel", name: "Full name", message: "How can we help?", phone: "WhatsApp", send: "Send message", formKicker: "CONTACT FORM", formTitle: "Tell us how we can help", formRequired: "All fields are required.", namePlaceholder: "Enter your name", emailPlaceholder: "name@company.com", phonePlaceholder: "+593 99 999 9999", messagePlaceholder: "Write your message or request here…", formNote: "By sending this form, you agree that we may use your data only to respond to your request.", sending: "Sending…", received: "MESSAGE RECEIVED", thankYou: "Thank you for contacting us.", sent: "Your information was successfully sent to Rigel.", sendAnother: "Send another message", required: "Complete the required fields.",
      notFound: "Content not found", backProducts: "Back to products", backBlog: "Back to blog"
    }
  }[lang];

  var clientes = [
    { nombre: "La Casa del Encebollado", imagen: "assets/clientes/la-casa-del-encebollado.jpg" },
    { nombre: "Biopremix", imagen: "assets/clientes/biopremix.jpg" },
    { nombre: "Industrias Omega", imagen: "assets/clientes/industrias-omega.jpg" },
    { nombre: "Indunidas", imagen: "assets/clientes/indunidas.jpg" },
    { nombre: "Tutto Freddo", imagen: "assets/clientes/tutto-freddo.jpg" },
    { nombre: "Ecuatorianita Import & Export", imagen: "assets/clientes/ecuatorianita-import-export.jpg" },
    { nombre: "Ala Cena", imagen: "assets/clientes/ala-cena.jpg" },
    { nombre: "La Cuencana", imagen: "assets/clientes/la-cuencana.jpg" },
    { nombre: "Alimentos DelSurco", imagen: "assets/clientes/alimentos-del-surco.jpg" },
    { nombre: "Enchapres Decorativos S.A. · ENDESA", imagen: "assets/clientes/endesa-enchapres-decorativos.jpg" },
    { nombre: "Yupi Snacks", imagen: "assets/clientes/yupi-snacks.jpg" },
    { nombre: "Industrial Latina", imagen: "assets/clientes/industrial-latina.jpg" },
    { nombre: "Galleta Pecosa", imagen: "assets/clientes/galleta-pecosa.jpg" },
    { nombre: "Sigmaplast", imagen: "assets/clientes/sigmaplast.jpg" },
    { nombre: "Proglobal Food & Beverages", imagen: "assets/clientes/proglobal-food-beverages.jpg" },
    { nombre: "Ilianza", imagen: "assets/clientes/ilianza.jpg" },
    { nombre: "All Fields", imagen: "assets/clientes/all-fields.jpg" },
    { nombre: "Panatlantic Logistics S.A.", imagen: "assets/clientes/panatlantic-logistics.jpg" },
    { nombre: "Logistics S.A.", imagen: "assets/clientes/logistics-sa.jpg" },
    { nombre: "Lubrisa", imagen: "assets/clientes/lubrisa.jpg" },
    { nombre: "Zara Import", imagen: "assets/clientes/zara-import.jpg" },
    { nombre: "Furia ST", imagen: "assets/clientes/furia-st.jpg" },
    { nombre: "El Café de Tere", imagen: "assets/clientes/el-cafe-de-tere.jpg" },
    { nombre: "RapiDiagnostics", imagen: "assets/clientes/rapi-diagnostics.jpg" },
    { nombre: "El Sanduchón", imagen: "assets/clientes/el-sanduchon.jpg" },
    { nombre: "Configolsa", imagen: "assets/clientes/configolsa.jpg" },
    { nombre: "Agricampo S.A.", imagen: "assets/clientes/agricampo.jpg" },
    { nombre: "Fritamoro", imagen: "assets/clientes/fritamoro.jpg" },
    { nombre: "El Buco a Casa", imagen: "assets/clientes/el-buco-a-casa.jpg" }
  ];

  function asset(ruta) { return String(ruta || "").replace(/^\//, ""); }

  function conIdioma(ruta) {
    if (/^(https?:|mailto:|tel:)/.test(ruta)) return ruta;
    var hash = "";
    var posicionHash = ruta.indexOf("#");
    if (posicionHash !== -1) { hash = ruta.slice(posicionHash); ruta = ruta.slice(0, posicionHash); }
    var separador = ruta.indexOf("?") === -1 ? "?" : "&";
    return ruta + separador + "lang=" + lang + hash;
  }

  function cambiarIdioma() {
    var nuevos = new URLSearchParams(window.location.search);
    nuevos.set("lang", lang === "es" ? "en" : "es");
    return (window.location.pathname.split("/").pop() || "index.html") + "?" + nuevos.toString() + window.location.hash;
  }

  function enlaceProducto(slug) { return conIdioma("producto.html?slug=" + encodeURIComponent(slug)); }
  function enlaceArticulo(slug) { return conIdioma("articulo.html?slug=" + encodeURIComponent(slug)); }

  function rutaActiva(archivo) {
    var actual = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    var archivosProductos = ["productos.html", "catalogo.html", "producto.html"];
    var activo = archivo === "productos.html" ? archivosProductos.indexOf(actual) !== -1 : actual === archivo;
    return activo ? ' aria-current="page"' : "";
  }

  function marca() { return '<img src="assets/brand/rigel-horizontal.png" alt="Rigel">'; }

  function enlacesSociales() {
    return '<div class="redes-sociales" aria-label="Redes sociales de Rigel">' + redes.map(function (red) {
      return '<a href="' + red.enlace + '" target="_blank" rel="noreferrer" aria-label="' + red.nombre + '"><img src="assets/social/' + red.icono + '" alt=""><span>' + red.nombre + '</span></a>';
    }).join("") + '</div>';
  }

  function dibujarEstructura() {
    var saltar = document.querySelector(".saltar-contenido");
    if (saltar) saltar.textContent = texto.skip;
    var header = document.getElementById("site-header");
    header.className = "cabecera";
    header.innerHTML = '<div class="contenedor cabecera-interior">' +
      '<a class="marca marca-imagen" href="' + conIdioma("index.html") + '" aria-label="Rigel, ' + texto.home + '">' + marca() + '</a>' +
      '<button class="menu-boton" type="button" aria-expanded="false" aria-controls="menu-principal"><span></span><span></span><span></span><span class="solo-lectura">Menu</span></button>' +
      '<nav id="menu-principal" class="navegacion" aria-label="Menu">' +
        '<a href="' + conIdioma("index.html") + '"' + rutaActiva("index.html") + '>' + texto.home + '</a>' +
        '<a href="' + conIdioma("productos.html") + '"' + rutaActiva("productos.html") + '>' + texto.products + '</a>' +
        '<a href="' + conIdioma("quienes-somos.html") + '"' + rutaActiva("quienes-somos.html") + '>' + texto.about + '</a>' +
        '<a href="' + conIdioma("blog.html") + '"' + rutaActiva("blog.html") + '>' + texto.blog + '</a>' +
        '<a href="' + conIdioma("contacto.html") + '"' + rutaActiva("contacto.html") + '>' + texto.support + '</a>' +
        '<a class="idioma-cambio" href="' + cambiarIdioma() + '" lang="' + (lang === "es" ? "en" : "es") + '">' + (lang === "es" ? "EN" : "ES") + '</a>' +
      '</nav></div>';

    var menuButton = document.querySelector(".menu-boton");
    var menu = document.getElementById("menu-principal");
    menuButton.addEventListener("click", function () {
      var abierto = menu.classList.toggle("navegacion-abierta");
      menuButton.setAttribute("aria-expanded", String(abierto));
    });

    var footer = document.getElementById("site-footer");
    footer.className = "pie";
    footer.innerHTML = '<div class="pie-ventajas"><div class="contenedor ventajas-rejilla">' +
      '<div><span>01</span><p><strong>' + texto.advice + '</strong> ' + texto.adviceText + '</p></div>' +
      '<div><span>02</span><p><strong>' + texto.technical + '</strong> ' + texto.technicalText + '</p></div>' +
      '<div><span>03</span><p><strong>' + texto.coverage + '</strong> ' + texto.coverageText + '</p></div>' +
      '</div></div><div class="contenedor pie-principal"><div class="pie-marca"><a class="marca marca-imagen" href="' + conIdioma("index.html") + '">' + marca() + '</a><p>' + texto.footerText + '</p><a class="boton boton-verde" href="' + whatsapp + '" target="_blank" rel="noreferrer">' + texto.contactUs + '</a>' + enlacesSociales() + '</div>' +
      '<div class="pie-columnas"><div><h2>Rigel</h2><a href="' + conIdioma("index.html") + '">' + texto.home + '</a><a href="' + conIdioma("quienes-somos.html") + '">' + texto.about + '</a><a href="' + conIdioma("blog.html") + '">' + texto.blog + '</a></div>' +
      '<div><h2>' + texto.products + '</h2><a href="' + conIdioma("productos.html?tipo=Codificadora") + '">' + texto.printers + '</a><a href="' + conIdioma("productos.html?tipo=Cartucho") + '">' + texto.cartridges + '</a><a href="' + conIdioma("productos.html?tipo=Accesorio") + '">' + texto.accessories + '</a></div>' +
      '<div><h2>' + texto.support + '</h2><a href="' + conIdioma("quienes-somos.html#preguntas") + '">' + texto.faq + '</a><a href="' + conIdioma("contacto.html") + '">' + texto.contact + '</a><a href="mailto:' + correo + '">' + correo + '</a></div></div></div>' +
      '<div class="contenedor pie-legal"><p>© Rigel 2026.</p></div>';

    if (!document.querySelector(".whatsapp-flotante")) {
      document.body.insertAdjacentHTML("beforeend", '<a class="whatsapp-flotante" href="' + whatsapp + '" target="_blank" rel="noreferrer" aria-label="' + texto.contactUs + ' por WhatsApp"><img src="assets/social/whatsapp.svg" alt=""><span>WhatsApp</span></a>');
    }
  }

  function tarjetaProducto(producto) {
    return '<article class="tarjeta-producto"><div class="producto-cabecera"><span>' + producto.modelo + '</span></div>' +
      '<a class="producto-imagen" href="' + enlaceProducto(producto.slug) + '"><img src="' + asset(producto.imagen) + '" alt="' + producto.nombre + '" loading="lazy"></a>' +
      '<p>' + producto.tipo + ' · ' + producto.familia + '</p><h2><a href="' + enlaceProducto(producto.slug) + '">' + producto.nombre + '</a></h2>' +
      '<div class="producto-enlace"><a href="' + enlaceProducto(producto.slug) + '">' + texto.viewFeatures + ' <span aria-hidden="true">→</span></a></div></article>';
  }

  function tarjetaArticulo(articulo) {
    return '<article class="tarjeta-blog"><a class="blog-imagen" href="' + enlaceArticulo(articulo.slug) + '"><img src="' + asset(articulo.imagen) + '" alt="" loading="lazy"></a><p>' + articulo.categoria + '</p><h2><a href="' + enlaceArticulo(articulo.slug) + '">' + articulo.titulo + '</a></h2><span>' + articulo.extracto + '</span><a href="' + enlaceArticulo(articulo.slug) + '">' + texto.read + ' <b aria-hidden="true">→</b></a></article>';
  }

  function iniciarHero() {
    var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
    var puntos = Array.prototype.slice.call(document.querySelectorAll(".hero-control button"));
    if (!slides.length) return;
    var indice = 0, temporizador;
    function mostrar(nuevo) {
      indice = (nuevo + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.classList.toggle("hero-slide-activo", i === indice); slide.setAttribute("aria-hidden", String(i !== indice)); });
      puntos.forEach(function (punto, i) { punto.classList.toggle("activo", i === indice); });
    }
    function iniciar() { window.clearInterval(temporizador); temporizador = window.setInterval(function () { mostrar(indice + 1); }, 5200); }
    document.querySelector(".hero-anterior").addEventListener("click", function () { mostrar(indice - 1); iniciar(); });
    document.querySelector(".hero-siguiente").addEventListener("click", function () { mostrar(indice + 1); iniciar(); });
    puntos.forEach(function (punto, i) { punto.addEventListener("click", function () { mostrar(i); iniciar(); }); });
    mostrar(0); iniciar();
  }

  function seccionClientes() {
    var tarjetas = clientes.concat(clientes, clientes).map(function (cliente, i) {
      var original = i < clientes.length;
      var prioritaria = i >= clientes.length && i < clientes.length + 5;
      return '<div class="cliente-tarjeta"' + (original ? '' : ' aria-hidden="true"') + '><div class="cliente-logo-marco"><img src="' + asset(cliente.imagen) + '" alt="' + (original ? cliente.nombre : '') + '" loading="' + (prioritaria ? 'eager' : 'lazy') + '"></div></div>';
    }).join("");
    return '<section id="clientes" class="seccion clientes-seccion clientes-inicio"><div class="contenedor"><div class="clientes-encabezado"><div><p class="eyebrow">' + texto.clientsEyebrow + '</p><h2>' + texto.clientsTitle + '</h2></div><div class="clientes-controles"><button id="cliente-anterior" class="clientes-flecha" type="button" aria-label="' + texto.clientPrevious + '"><span aria-hidden="true">←</span></button><button id="clientes-pausa" class="clientes-flecha clientes-pausa" type="button" aria-label="' + texto.clientPause + '"><span aria-hidden="true">Ⅱ</span></button><button id="cliente-siguiente" class="clientes-flecha" type="button" aria-label="' + texto.clientNext + '"><span aria-hidden="true">→</span></button></div></div><div class="clientes-banda" aria-roledescription="carousel" aria-label="' + texto.clients + '"><div id="clientes-ventana" class="clientes-ventana"><div id="clientes-pista" class="clientes-pista">' + tarjetas + '</div></div></div></div></section>';
  }

  function renderInicio() {
    var prefijo = lang === "en" ? "en-" : "";
    var slides = [1, 2, 3].map(function (numero, i) { return { desktop: "assets/slides/" + prefijo + "desktop-" + numero + ".webp", mobile: "assets/slides/" + prefijo + "movil-" + numero + ".webp", alt: texto.heroAlt[i] }; });
    contenido.innerHTML = '<section class="hero" aria-roledescription="carousel"><div class="hero-pista">' + slides.map(function (slide, i) { return '<picture class="hero-slide' + (i === 0 ? " hero-slide-activo" : "") + '" aria-hidden="' + (i !== 0) + '"><source media="(max-width:700px)" srcset="' + slide.mobile + '"><img src="' + slide.desktop + '" alt="' + slide.alt + '"></picture>'; }).join("") + '</div><button class="hero-flecha hero-anterior" type="button" aria-label="Previous">‹</button><button class="hero-flecha hero-siguiente" type="button" aria-label="Next">›</button><div class="hero-control">' + slides.map(function (_, i) { return '<button type="button" class="' + (i === 0 ? "activo" : "") + '" aria-label="Slide ' + (i + 1) + '"></button>'; }).join("") + '</div></section>' +
      '<section class="seccion inicio-presentacion"><div class="contenedor inicio-presentacion-grid"><div><p class="eyebrow">' + texto.heroEyebrow + '</p><h1>' + texto.heroTitle + '</h1></div><div><p>' + texto.heroText + '</p><div class="inicio-acciones"><a class="boton boton-azul" href="' + conIdioma("productos.html") + '">' + texto.seeProducts + '</a><a class="boton boton-verde" href="' + whatsapp + '" target="_blank" rel="noreferrer">' + texto.quote + '</a></div></div></div></section>' +
      '<section class="franja-industrial"><div class="contenedor franja-contenido"><div><p class="eyebrow eyebrow-claro">' + texto.applicationsEyebrow + '</p><h2>' + texto.applicationsTitle + '</h2></div><div class="franja-texto"><p>' + texto.applicationsText + '</p><a href="' + conIdioma("productos.html") + '">' + texto.seeProducts + ' →</a></div></div><div class="contenedor cifras"><div><strong>' + texto.portable + '</strong><span>' + texto.portableText + '</span></div><div><strong>' + texto.automatic + '</strong><span>' + texto.automaticText + '</span></div><div><strong>' + texto.industrial + '</strong><span>' + texto.industrialText + '</span></div></div></section>' +
      '<section class="seccion blog-inicio"><div class="contenedor"><div class="titulo-fila titulo-fila-compacta"><div><p class="eyebrow">' + texto.knowledge + '</p><h2>' + texto.guides + '</h2></div><a class="enlace-flecha" href="' + conIdioma("blog.html") + '">' + texto.allArticles + ' →</a></div><div class="rejilla-blog">' + articulos.slice(0, 3).map(tarjetaArticulo).join("") + '</div></div></section>' +
      '<section class="cta-final"><div class="contenedor"><div><p class="eyebrow eyebrow-claro">WHATSAPP</p><h2>' + texto.quote + '</h2></div><a class="boton boton-blanco" href="' + whatsapp + '" target="_blank" rel="noreferrer">' + texto.contactUs + '</a></div></section>' +
      seccionClientes();
    iniciarHero();
    iniciarClientes();
  }

  function renderProductos() {
    contenido.innerHTML = '<section class="cabecera-pagina"><div class="contenedor"><p class="eyebrow">' + texto.inventory + '</p><h1>' + texto.inventoryTitle + '</h1><p>' + texto.inventoryText + '</p></div></section><section class="seccion"><div class="contenedor"><div class="filtros-catalogo"><label class="busqueda-catalogo"><span>' + texto.search + '</span><input id="filtro-busqueda" type="search" placeholder="' + texto.searchPlaceholder + '"></label><label><span>' + texto.height + '</span><select id="filtro-altura"><option value="todas">' + texto.allHeights + '</option></select></label></div><div class="tipo-filtros" id="tipo-filtros"></div><div id="rejilla-productos"></div></div></section>';
    var busqueda = document.getElementById("filtro-busqueda");
    var altura = document.getElementById("filtro-altura");
    var tipos = ["Todos"].concat(Array.from(new Set(productos.map(function (p) { return p.tipo; }))));
    var alturas = Array.from(new Set(productos.map(function (p) { return p.alturaFiltro; })));
    alturas.forEach(function (opcion) { altura.insertAdjacentHTML("beforeend", '<option value="' + opcion + '">' + opcion + '</option>'); });
    var solicitado = params.get("tipo");
    if (lang === "en") solicitado = ({ Codificadora: "Coding printer", Cartucho: "Cartridge", Accesorio: "Accessory" })[solicitado] || solicitado;
    var tipo = tipos.indexOf(solicitado) !== -1 ? solicitado : "Todos";
    function filtrar() {
      var consulta = busqueda.value.toLowerCase().trim();
      var filtrados = productos.filter(function (p) {
        var campo = (p.nombre + " " + p.modelo + " " + p.familia + " " + p.resumen).toLowerCase();
        return (!consulta || campo.indexOf(consulta) !== -1) && (tipo === "Todos" || p.tipo === tipo) && (altura.value === "todas" || p.alturaFiltro === altura.value);
      });
      document.getElementById("tipo-filtros").innerHTML = tipos.map(function (item) { return '<button type="button" data-tipo="' + item + '" class="' + (item === tipo ? "activo" : "") + '">' + (item === "Todos" ? texto.all : item) + '</button>'; }).join("") + '<p>' + filtrados.length + ' ' + (filtrados.length === 1 ? texto.oneResult : texto.results) + '</p>';
      document.getElementById("rejilla-productos").innerHTML = filtrados.length ? '<div class="rejilla-productos rejilla-inventario">' + filtrados.map(tarjetaProducto).join("") + '</div>' : '<div class="sin-resultados"><h2>' + texto.noResults + '</h2><p>' + texto.tryAgain + '</p><button id="restablecer" class="boton boton-azul" type="button">' + texto.reset + '</button></div>';
      Array.prototype.forEach.call(document.querySelectorAll("[data-tipo]"), function (boton) { boton.addEventListener("click", function () { tipo = boton.getAttribute("data-tipo"); filtrar(); }); });
      var reset = document.getElementById("restablecer");
      if (reset) reset.addEventListener("click", function () { busqueda.value = ""; altura.value = "todas"; tipo = "Todos"; filtrar(); });
    }
    busqueda.addEventListener("input", filtrar); altura.addEventListener("change", filtrar); filtrar();
  }

  function iniciarClientes() {
    var pista = document.getElementById("clientes-pista");
    var ventana = document.getElementById("clientes-ventana");
    var anterior = document.getElementById("cliente-anterior");
    var siguiente = document.getElementById("cliente-siguiente");
    var pausa = document.getElementById("clientes-pausa");
    if (!pista || !ventana || !anterior || !siguiente || !pausa || !clientes.length) return;
    var indice = clientes.length, temporizador, enTransicion = false, pausado = false;
    function paso() {
      var tarjeta = pista.querySelector(".cliente-tarjeta");
      var estilos = window.getComputedStyle(pista);
      return tarjeta ? tarjeta.getBoundingClientRect().width + (parseFloat(estilos.columnGap || estilos.gap) || 0) : 0;
    }
    function posicionar(sinTransicion) {
      if (sinTransicion) pista.classList.add("sin-transicion");
      pista.style.transform = "translate3d(" + (-indice * paso()) + "px,0,0)";
      if (sinTransicion) window.requestAnimationFrame(function () { pista.classList.remove("sin-transicion"); });
    }
    function normalizar() {
      enTransicion = false;
      if (indice >= clientes.length * 2) { indice -= clientes.length; posicionar(true); }
      else if (indice < clientes.length) { indice += clientes.length; posicionar(true); }
    }
    function mover(cambio) {
      if (enTransicion) return;
      enTransicion = true;
      indice += cambio;
      posicionar(false);
    }
    function detener() { window.clearInterval(temporizador); }
    function iniciar() {
      detener();
      if (!pausado && !document.hidden) temporizador = window.setInterval(function () { mover(1); }, 1800);
    }
    function mostrarEstadoPausa() {
      pausa.setAttribute("aria-label", pausado ? texto.clientPlay : texto.clientPause);
      pausa.innerHTML = '<span aria-hidden="true">' + (pausado ? '▶' : 'Ⅱ') + '</span>';
      pausa.classList.toggle("activo", pausado);
    }
    anterior.addEventListener("click", function () { mover(-1); iniciar(); });
    siguiente.addEventListener("click", function () { mover(1); iniciar(); });
    pausa.addEventListener("click", function () { pausado = !pausado; mostrarEstadoPausa(); iniciar(); });
    pista.addEventListener("transitionend", function (evento) { if (evento.target === pista && evento.propertyName === "transform") normalizar(); });
    ventana.addEventListener("mouseenter", detener);
    ventana.addEventListener("mouseleave", iniciar);
    window.addEventListener("resize", function () { enTransicion = false; posicionar(true); });
    document.addEventListener("visibilitychange", iniciar);
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) pausado = true;
    mostrarEstadoPausa();
    posicionar(true);
    iniciar();
  }

  function youtubeDirecto(url) {
    var match = String(url || "").match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    return match ? "https://www.youtube.com/watch?v=" + match[1] : url;
  }

  function renderProducto() {
    var slug = params.get("slug") || "m1";
    var producto = productos.find(function (item) { return item.slug === slug; });
    if (!producto) { noEncontrado(texto.backProducts, conIdioma("productos.html")); return; }
    document.title = producto.nombre + " | Rigel";
    var galeria = [producto.imagen].concat(producto.galeria || []).filter(function (ruta, i, lista) { return lista.indexOf(ruta) === i; });
    var relacionados = (producto.compatibles || []).map(function (modelo) { return productos.find(function (item) { return item.modelo.toLowerCase() === modelo.toLowerCase(); }); }).filter(Boolean);
    if (!relacionados.length) relacionados = productos.filter(function (item) { return item.tipo === producto.tipo && item.slug !== producto.slug; }).slice(0, 3);
    contenido.innerHTML = '<div class="contenedor migas"><a href="' + conIdioma("index.html") + '">' + texto.breadcrumbHome + '</a><span>›</span><a href="' + conIdioma("productos.html") + '">' + texto.breadcrumbProducts + '</a><span>›</span><strong>' + producto.modelo + '</strong></div><section class="contenedor producto-hero"><div><div class="galeria-principal"><img id="imagen-producto" src="' + asset(galeria[0]) + '" alt="' + producto.nombre + '"></div>' + (galeria.length > 1 ? '<div class="galeria-miniaturas">' + galeria.map(function (imagen, i) { return '<button type="button" data-imagen="' + asset(imagen) + '" class="' + (i === 0 ? "activo" : "") + '"><img src="' + asset(imagen) + '" alt=""></button>'; }).join("") + '</div>' : "") + '</div><div class="producto-resumen"><p class="eyebrow">' + producto.tipo.toUpperCase() + ' · ' + producto.familia.toUpperCase() + '</p><h1>' + producto.nombre + '</h1><p class="producto-intro">' + producto.descripcion + '</p><ul class="lista-destacados">' + producto.destacados.map(function (item) { return '<li>' + item + '</li>'; }).join("") + '</ul><div class="producto-acciones"><a class="boton boton-verde" href="' + whatsapp + '" target="_blank" rel="noreferrer">' + texto.consultProduct + '</a>' + (producto.ficha ? '<a class="boton boton-contorno" href="' + asset(producto.ficha) + '" target="_blank">' + texto.sheet + '</a>' : "") + '</div></div></section>' +
      '<section class="seccion producto-detalles"><div class="contenedor detalles-rejilla"><div><p class="eyebrow">' + texto.information + '</p><h2>' + texto.features + '</h2><p>' + producto.resumen + '</p>' + (producto.incluye && producto.incluye.length ? '<div class="incluye"><h3>' + texto.includes + '</h3><ul>' + producto.incluye.map(function (item) { return '<li>' + item + '</li>'; }).join("") + '</ul></div>' : "") + '</div><dl class="tabla-especificaciones">' + producto.especificaciones.map(function (fila) { return '<div><dt>' + fila[0] + '</dt><dd>' + fila[1] + '</dd></div>'; }).join("") + '</dl></div></section>' +
      (producto.video ? '<section class="seccion producto-video"><div class="contenedor"><p class="eyebrow">' + texto.demonstration + '</p><h2>' + texto.watchWorking + '</h2><a class="video-enlace" href="' + youtubeDirecto(producto.video) + '" target="_blank" rel="noreferrer"><div><img src="' + asset(producto.imagen) + '" alt=""><span aria-hidden="true">▶</span></div><strong>' + texto.youtube + '</strong></a></div></section>' : "") +
      (relacionados.length ? '<section class="seccion relacionados"><div class="contenedor"><p class="eyebrow">' + texto.related + '</p><h2>' + texto.completeSolution + '</h2><div class="rejilla-productos">' + relacionados.slice(0, 3).map(tarjetaProducto).join("") + '</div></div></section>' : "") +
      '<section class="seccion consulta-producto"><div class="contenedor consulta-rejilla"><div><p class="eyebrow">' + texto.directAdvice + '</p><h2>' + texto.talkModel + '</h2><p>' + texto.talkModelText + '</p></div><div class="consulta-whatsapp"><img src="assets/brand/rigel-horizontal.png" alt="Rigel"><a class="boton boton-verde" href="' + whatsapp + '" target="_blank" rel="noreferrer">' + texto.consultProduct + '</a></div></div></section>';
    var principal = document.getElementById("imagen-producto");
    Array.prototype.forEach.call(document.querySelectorAll("[data-imagen]"), function (boton) { boton.addEventListener("click", function () { principal.src = boton.getAttribute("data-imagen"); Array.prototype.forEach.call(document.querySelectorAll("[data-imagen]"), function (b) { b.classList.remove("activo"); }); boton.classList.add("activo"); }); });
  }

  function renderBlog() {
    contenido.innerHTML = '<section class="cabecera-pagina"><div class="contenedor"><p class="eyebrow">' + texto.blogEyebrow + '</p><h1>' + texto.blogTitle + '</h1><p>' + texto.blogText + '</p></div></section><section class="seccion"><div class="contenedor"><div class="rejilla-blog rejilla-blog-completa">' + articulos.map(tarjetaArticulo).join("") + '</div></div></section>';
  }

  function renderArticulo() {
    var slug = params.get("slug") || (articulos[0] && articulos[0].slug);
    var articulo = articulos.find(function (item) { return item.slug === slug; });
    if (!articulo) { noEncontrado(texto.backBlog, conIdioma("blog.html")); return; }
    document.title = articulo.titulo + " | Rigel";
    var imagenes = articulo.imagenes || [];
    var secciones = articulo.secciones.map(function (seccion, indice) { return '<section>' + (seccion.titulo ? '<h2>' + seccion.titulo + '</h2>' : "") + (seccion.parrafos || []).map(function (p) { return '<p>' + p + '</p>'; }).join("") + (seccion.puntos ? '<div class="puntos-articulo">' + seccion.puntos.map(function (p) { return '<div><h3>' + p.titulo + '</h3><p>' + p.texto + '</p></div>'; }).join("") + '</div>' : "") + (imagenes[indice] ? '<img src="' + asset(imagenes[indice]) + '" alt="">' : "") + '</section>'; }).join("");
    var otros = articulos.filter(function (item) { return item.slug !== articulo.slug; }).slice(0, 3);
    contenido.innerHTML = '<article><header class="contenedor articulo-cabecera"><p class="eyebrow">' + articulo.categoria.toUpperCase() + '</p><h1>' + articulo.titulo + '</h1><p>' + articulo.extracto + '</p></header><div class="contenedor articulo-portada"><img src="' + asset(articulo.imagen) + '" alt="' + articulo.titulo + '"></div><div class="contenedor articulo-cuerpo">' + secciones + (articulo.video ? '<section><h2>Video</h2><a class="boton boton-azul" href="' + youtubeDirecto(articulo.video) + '" target="_blank" rel="noreferrer">' + texto.youtube + '</a></section>' : "") + '<aside class="articulo-cta"><p class="eyebrow">' + texto.needAdvice + '</p><h2>' + texto.findPrinter + '</h2><p>' + texto.findPrinterText + '</p><div><a class="boton boton-azul" href="' + conIdioma("productos.html") + '">' + texto.seeProducts + '</a><a class="boton boton-verde" href="' + whatsapp + '" target="_blank" rel="noreferrer">' + texto.contactUs + '</a></div></aside></div></article><section class="seccion otros-articulos"><div class="contenedor"><p class="eyebrow">' + texto.keepReading + '</p><h2>' + texto.otherArticles + '</h2><div class="rejilla-blog">' + otros.map(tarjetaArticulo).join("") + '</div></div></section>';
  }

  function obtenerPreguntas() {
    return lang === "en" ? [
      ["Does the equipment require maintenance?", "Frequent technical maintenance is not required. Correct cartridge cleaning and proper care help preserve print quality."],
      ["Do you supply consumables?", "Yes. Contact our team to confirm cartridge and consumable availability."],
      ["Is technical support available?", "Yes. Email <a href=\"mailto:ventas@rigelsa.com\">ventas@rigelsa.com</a> or message +593 93 947 4695 on WhatsApp."],
      ["Is the print permanent?", "Solvent ink gains adhesion over time. Results also depend on the material, surface preparation and cartridge type."],
      ["Can I connect it to a conveyor?", "Yes. Models with automatic mode can integrate with a conveyor through a sensor."],
      ["Is it easy to use?", "Yes. The software is intuitive, and Rigel provides technical sheets and support videos."],
      ["What is the expected equipment life?", "With correct care, the equipment is designed for long-term operation. Actual life depends on use and working conditions."],
      ["Is it a laser printer?", "No. It uses thermal inkjet technology and ink cartridges."],
      ["How does the warranty work?", "The warranty covers manufacturing defects after technical evaluation. Impact, water and misuse damage are not covered."],
      ["Can it print in color?", "Available colors depend on the cartridge and model. Ask about black, blue, red, yellow, green, magenta or white."]
    ] : [
      ["¿Requiere mantenimiento?", "Las codificadoras no requieren mantenimiento técnico frecuente. La limpieza correcta del cartucho y el cuidado del equipo ayudan a conservar la calidad de impresión."],
      ["¿Tienen suministros?", "Sí. Consulta la disponibilidad de cartuchos y consumibles directamente con nuestro equipo."],
      ["¿Disponen de soporte técnico?", "Sí. Puedes escribir a <a href=\"mailto:ventas@rigelsa.com\">ventas@rigelsa.com</a> o por WhatsApp al +593 93 947 4695."],
      ["¿La impresión es permanente?", "La tinta solvente adquiere mayor adherencia con el tiempo. El resultado también depende del material, la preparación de la superficie y el cartucho."],
      ["¿Puedo acoplarla a una banda transportadora?", "Sí. Los modelos compatibles con modo automático pueden integrarse mediante sensor."],
      ["¿Es fácil de usar?", "Sí. El software es intuitivo y Rigel ofrece fichas técnicas y videos de apoyo."],
      ["¿Cuál es la vida útil del equipo?", "Con los cuidados adecuados, los equipos están diseñados para una operación prolongada. La vida útil depende del uso y las condiciones de trabajo."],
      ["¿Es una impresora láser?", "No. Utiliza tecnología de inyección térmica y cartuchos de tinta."],
      ["¿Cómo funciona la garantía?", "La garantía cubre fallas de fábrica después de una evaluación técnica. Golpes, contacto con agua y uso incorrecto no están cubiertos."],
      ["¿Imprime a color?", "La disponibilidad de colores depende del cartucho y del modelo. Consulta opciones en negro, azul, rojo, amarillo, verde, magenta o blanco."]
    ];
  }

  function renderNosotros() {
    var preguntas = obtenerPreguntas();
    contenido.innerHTML = '<section class="seccion nosotros-presentacion"><div class="contenedor nosotros-rejilla"><div class="nosotros-mapa"><img src="assets/nosotros/mapa-presencia.png" alt="' + texto.aboutMapAlt + '"></div><div class="nosotros-contenido"><p class="eyebrow">' + texto.aboutEyebrow + '</p><h1>' + texto.aboutTitle + '</h1><p>' + texto.aboutParagraphOne + '</p><p>' + texto.aboutParagraphTwo + '</p></div></div></section>' +
      '<section id="preguntas" class="seccion faq-nosotros"><div class="contenedor faq-encabezado"><p class="eyebrow">' + texto.faqEyebrow + '</p><h2>' + texto.faqTitle + '</h2><p>' + texto.faqText + '</p></div><div class="contenedor faq-rejilla">' + preguntas.map(function (item, i) { return '<details' + (i === 0 ? " open" : "") + '><summary><span>' + String(i + 1).padStart(2, "0") + '</span>' + item[0] + '<b>+</b></summary><p>' + item[1] + '</p></details>'; }).join("") + '</div><div class="contenedor faq-contacto"><h2>' + texto.stillQuestions + '</h2><p>' + texto.stillQuestionsText + '</p><a class="boton boton-verde" href="' + whatsapp + '" target="_blank" rel="noreferrer">' + texto.contactUs + '</a></div></section>';
  }

  function renderContacto() {
    contenido.innerHTML = '<section class="cabecera-pagina"><div class="contenedor"><p class="eyebrow">' + texto.contactEyebrow + '</p><h1>' + texto.contactTitle + '</h1><p>' + texto.contactText + '</p></div></section><section class="seccion"><div class="contenedor contacto-rejilla"><div class="contacto-info"><p class="eyebrow">' + texto.personalized + '</p><h2>' + texto.supportTitle + '</h2><p>' + texto.supportText + '</p><dl><div><dt>' + texto.email + '</dt><dd><a href="mailto:' + correo + '">' + correo + '</a></dd></div><div><dt>WhatsApp</dt><dd><a href="' + whatsapp + '" target="_blank" rel="noreferrer">+593 93 947 4695</a></dd></div><div><dt>' + texto.channel + '</dt><dd><a href="https://www.youtube.com/@Rigel.International" target="_blank" rel="noreferrer">YouTube Rigel International</a></dd></div></dl>' + enlacesSociales() + '</div><div class="formulario-google"><div id="formulario-contenido"><div class="formulario-google-encabezado"><p class="eyebrow">' + texto.formKicker + '</p><h2>' + texto.formTitle + '</h2><p>' + texto.formRequired + '</p></div><form id="formulario-contacto" class="formulario formulario-google-campos" action="https://docs.google.com/forms/d/e/1FAIpQLSeXjmDEZUJFnGkpv1cUe9XHqZEpWWQDhXKMZEEW3Z7PogQjpQ/formResponse" method="POST" target="respuesta-google"><input type="hidden" name="fvv" value="1"><input type="hidden" name="pageHistory" value="0"><label><span>' + texto.name + '</span><input type="text" name="entry.1511391054" placeholder="' + texto.namePlaceholder + '" autocomplete="name" maxlength="160" required></label><div class="formulario-doble"><label><span>' + texto.email + '</span><input type="email" name="entry.1127554998" placeholder="' + texto.emailPlaceholder + '" autocomplete="email" maxlength="180" required></label><label><span>' + texto.phone + '</span><input type="tel" name="entry.271073587" placeholder="' + texto.phonePlaceholder + '" autocomplete="tel" inputmode="tel" maxlength="40" required></label></div><label><span>' + texto.message + '</span><textarea name="entry.874449950" placeholder="' + texto.messagePlaceholder + '" rows="6" maxlength="4000" required></textarea></label><div class="formulario-acciones"><button class="boton boton-azul" type="submit"><span class="texto-enviar">' + texto.send + '</span><span aria-hidden="true">→</span></button><a class="boton boton-verde" href="' + whatsapp + '" target="_blank" rel="noreferrer">WhatsApp</a></div><p class="formulario-estado">' + texto.formNote + '</p></form></div><div id="formulario-exito" class="formulario-google-exito oculto" role="status" aria-live="polite"><span class="formulario-google-check" aria-hidden="true">✓</span><p class="eyebrow">' + texto.received + '</p><h2>' + texto.thankYou + '</h2><p>' + texto.sent + '</p><div class="formulario-acciones"><button class="boton boton-azul formulario-otro" type="button">' + texto.sendAnother + '</button><a class="boton boton-verde" href="' + whatsapp + '" target="_blank" rel="noreferrer">WhatsApp</a></div></div><iframe class="formulario-destino" name="respuesta-google" title="Respuesta de Google Forms"></iframe></div></div></section>';
    activarFormularioGoogle();
  }

  function activarFormularioGoogle() {
    var formulario = document.getElementById("formulario-contacto");
    var iframe = document.querySelector('iframe[name="respuesta-google"]');
    var contenidoFormulario = document.getElementById("formulario-contenido");
    var exito = document.getElementById("formulario-exito");
    var boton = formulario.querySelector('button[type="submit"]');
    var textoBoton = boton.querySelector(".texto-enviar");
    var enviado = false;

    formulario.addEventListener("submit", function () {
      enviado = true;
      boton.disabled = true;
      textoBoton.textContent = texto.sending;
    });

    iframe.addEventListener("load", function () {
      if (!enviado) return;
      enviado = false;
      formulario.reset();
      contenidoFormulario.classList.add("oculto");
      exito.classList.remove("oculto");
      boton.disabled = false;
      textoBoton.textContent = texto.send;
    });

    exito.querySelector(".formulario-otro").addEventListener("click", function () {
      exito.classList.add("oculto");
      contenidoFormulario.classList.remove("oculto");
    });
  }

  function noEncontrado(etiqueta, enlace) {
    contenido.innerHTML = '<section class="pagina-404"><div><img class="logo-404" src="assets/brand/rigel-horizontal.png" alt="Rigel"><h1>' + texto.notFound + '</h1><a class="boton boton-azul" href="' + enlace + '">' + etiqueta + '</a></div></section>';
  }

  dibujarEstructura();
  var pagina = document.body.getAttribute("data-page");
  var titulos = lang === "en" ? {
    inicio: "Rigel | Marking & coding", productos: "Products | Rigel", nosotros: "About us | Rigel",
    blog: "Blog | Rigel", contacto: "Contact & support | Rigel"
  } : {
    inicio: "Rigel | Marcaje y codificación", productos: "Productos | Rigel", nosotros: "Quiénes somos | Rigel",
    blog: "Blog | Rigel", contacto: "Contacto y soporte | Rigel"
  };
  if (titulos[pagina]) document.title = titulos[pagina];
  if (pagina === "inicio") renderInicio();
  else if (pagina === "productos") renderProductos();
  else if (pagina === "nosotros") renderNosotros();
  else if (pagina === "producto") renderProducto();
  else if (pagina === "blog") renderBlog();
  else if (pagina === "articulo") renderArticulo();
  else if (pagina === "contacto") renderContacto();
  else noEncontrado(texto.home, conIdioma("index.html"));
}());
