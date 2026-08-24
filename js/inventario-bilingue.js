(function () {
  "use strict";

  var data = window.RIGEL_DATA;
  if (!data) return;

  function actualizar(slug, cambios) {
    var producto = data.productos.find(function (item) { return item.slug === slug; });
    if (producto) Object.assign(producto, cambios);
  }

  actualizar("m1", {
    fichaEn: "/assets/productos/m1/technical-data-sheet.pdf",
    video: "https://www.youtube.com/watch?v=P94ap01WZgY",
    destacados: ["Pantalla táctil de 3,5 pulgadas", "De 1 a 6 líneas", "Batería de 4 a 6 horas", "Resolución de 300 DPI"],
    especificaciones: [
      ["Garantía", "1 año por fallas de fábrica"], ["Pantalla", "Táctil de 3,5 pulgadas"],
      ["Líneas de impresión", "1 a 6 líneas"], ["Altura de impresión", "12,7 mm"],
      ["Longitud de impresión", "1,5 m"], ["Resolución", "300 DPI"],
      ["Capacidad de tinta", "42 ml"], ["Tipo de tinta", "Tinta solvente"],
      ["Colores de tinta", "Negro, azul, rojo, amarillo y blanco"], ["Formatos de imagen", "JPG, PNG y BMP"],
      ["Superficies", "Cartón, tubo, cable, metal, plástico, aluminio, papel y más"], ["Batería", "4 a 6 horas"],
      ["Peso", "218 g"], ["Dimensiones", "85 × 106 mm"], ["Memoria interna", "65 MB"],
      ["Voltaje", "110 V - 220 V / carga tipo C"]
    ]
  });

  actualizar("b15", {
    fichaEn: "/assets/productos/b15/technical-data-sheet.pdf",
    video: "https://www.youtube.com/watch?v=EAKc1gC-TPA",
    destacados: ["Conexión Wi-Fi", "Aplicación Android e iOS", "De 1 a 5 líneas", "Tinta solvente de secado rápido"],
    especificaciones: [
      ["Garantía", "1 año por fallas de fábrica"], ["Conectividad", "Wi-Fi"],
      ["Interfaz", "Aplicación para Android e iOS"], ["Líneas de impresión", "1 a 5 líneas"],
      ["Altura de impresión", "12,7 mm"], ["Longitud de impresión", "1 m"],
      ["Distancia de impresión", "2 a 5 mm"], ["Resolución", "300 DPI"],
      ["Velocidad", "30 m/min"], ["Capacidad de tinta", "42 ml"],
      ["Colores de tinta", "Negro, azul, rojo, amarillo y blanco"], ["Formatos de imagen", "JPG, BMP y PNG"],
      ["Batería", "500 mAh / 4 a 6 horas"], ["Peso", "195 g"],
      ["Dimensiones", "110 × 40 × 90 mm"], ["Temperatura de trabajo", "5 °C a 35 °C"]
    ]
  });

  actualizar("bt6205bl", {
    fichaEn: "/assets/productos/bt6205bl/technical-data-sheet.pdf",
    video: "https://www.youtube.com/watch?v=hQ1XnHxlezo",
    especificaciones: [
      ["Garantía", "2 años por fallas de fábrica"], ["Sistema operativo", "Linux"],
      ["Líneas de impresión", "1 a 6 líneas"], ["Altura de impresión", "12,7 mm"],
      ["Longitud de impresión", "1 m"], ["Distancia de impresión", "2 a 5 mm"],
      ["Pantalla", "4,3 pulgadas de alta definición"], ["Resolución", "600 / 300 DPI"],
      ["Velocidad", "30 m/min"], ["Memoria", "128 MB"], ["Batería", "Hasta 16 horas"],
      ["Peso", "420 g"], ["Dimensiones", "126 × 41 × 204 mm"],
      ["Superficies", "Plástico, vidrio, metal, cables, aluminio, cartón corrugado, algodón y más"]
    ]
  });

  actualizar("bt6210bl", {
    fichaEn: "/assets/productos/bt6210bl/technical-data-sheet.pdf",
    video: "https://www.youtube.com/watch?v=kITvkkMcnz4",
    especificaciones: [
      ["Garantía", "2 años por fallas de fábrica"], ["Sistema operativo", "Linux"],
      ["Líneas de impresión", "1 a 10 líneas"], ["Altura de impresión", "25,4 mm"],
      ["Longitud de impresión", "2 m"], ["Distancia de impresión", "2 a 5 mm"],
      ["Pantalla", "4,3 pulgadas de alta definición"], ["Resolución", "300 DPI"],
      ["Velocidad", "15 m/min"], ["Memoria", "128 MB"], ["Batería", "Hasta 16 horas"],
      ["Peso", "430 g"], ["Dimensiones", "126 × 41 × 204 mm"],
      ["Tamaño máximo de impresión", "25,4 × 406 mm"]
    ]
  });

  actualizar("b45", {
    fichaEn: "/assets/productos/b45/technical-data-sheet.pdf",
    especificaciones: [
      ["Garantía", "2 años por fallas de fábrica"], ["Sistema operativo", "Linux"],
      ["Líneas de impresión", "1 a 20 líneas"], ["Altura de impresión", "50 mm"],
      ["Longitud de impresión", "2 m"], ["Distancia de impresión", "2 a 5 mm"],
      ["Pantalla", "5 pulgadas de alta definición"], ["Resolución", "300 DPI"],
      ["Velocidad", "15 m/min"], ["Memoria", "4 GB"], ["Batería", "Hasta 8 horas"],
      ["Peso", "860 g"], ["Dimensiones", "160 × 80 × 280 mm"], ["Nivel de gris", "1 a 10 ajustable"]
    ]
  });

  actualizar("b85", {
    fichaEn: "/assets/productos/b85/technical-data-sheet.pdf",
    especificaciones: [
      ["Garantía", "2 años por fallas de fábrica"], ["Sistema operativo", "Linux"],
      ["Líneas de impresión", "1 a 40 líneas"], ["Altura de impresión", "100 mm"],
      ["Longitud de impresión", "2 m"], ["Distancia de impresión", "2 a 5 mm"],
      ["Pantalla", "4,3 pulgadas de alta definición"], ["Resolución", "600 / 300 DPI"],
      ["Velocidad", "30 m/min"], ["Memoria", "128 MB"], ["Batería", "Hasta 16 horas"],
      ["Peso", "420 g"], ["Dimensiones", "232 × 110 × 180 mm"], ["Nivel de gris", "1 a 5"]
    ]
  });

  data.productos.push(
    {
      slug: "m2", nombre: "Codificadora M2", modelo: "M2", tipo: "Codificadora", familia: "Portátil compacta",
      disponibilidad: "disponible", disponibilidadTexto: "Disponible",
      resumen: "Codificadora portátil compacta con pantalla táctil y hasta seis líneas de impresión.",
      descripcion: "Equipo manual ligero para imprimir fechas, lotes, textos, logotipos y códigos sobre superficies planas, curvas, rugosas y espacios reducidos.",
      imagen: "/assets/productos/m2/principal.webp",
      galeria: ["/assets/productos/m2/galeria-1.webp", "/assets/productos/m2/galeria-2.webp"],
      altura: "12,7 mm", alturaFiltro: "12,7 mm",
      destacados: ["Pantalla táctil de 2,4 pulgadas", "De 1 a 6 líneas", "Resolución de 300 a 600 DPI", "Peso de 185 g"],
      especificaciones: [
        ["Garantía", "6 meses por fallas de fábrica"], ["Pantalla", "Táctil de 2,4 pulgadas"],
        ["Líneas de impresión", "1 a 6 líneas"], ["Altura de impresión", "12,7 mm"],
        ["Resolución", "300 / 600 DPI"], ["Capacidad de tinta", "42 ml"],
        ["Tipo de tinta", "Tinta solvente"], ["Formatos de imagen", "JPG, PNG y BMP"],
        ["Batería", "4 a 6 horas"], ["Peso", "185 g"], ["Dimensiones", "70 × 97 × 45 mm"],
        ["Voltaje", "110 V - 220 V / carga tipo C"]
      ], compatibles: ["S70", "SK10"]
    },
    {
      slug: "f61", nombre: "Codificadora F61", modelo: "F61", tipo: "Codificadora", familia: "Industrial en línea",
      disponibilidad: "bajo-pedido", disponibilidadTexto: "Disponible bajo pedido",
      resumen: "Solución de alta velocidad adaptable a distintas líneas de producción.",
      descripcion: "Codificadora industrial con pantalla táctil de 7 pulgadas, gestión de accesos, conectividad externa y velocidad de impresión de hasta 120 m/min.",
      imagen: "/assets/productos/f61/principal.webp",
      galeria: ["/assets/productos/f61/galeria-1.webp", "/assets/productos/f61/galeria-2.webp"],
      altura: "12,7 mm", alturaFiltro: "12,7 mm",
      destacados: ["Velocidad de hasta 120 m/min", "Pantalla táctil HD de 7 pulgadas", "8 GB de memoria", "Integración con sensor y codificador"],
      especificaciones: [
        ["Sistema operativo", "Basado en Linux"], ["Pantalla", "Táctil HD de 7 pulgadas"],
        ["Altura de impresión", "12,7 mm"], ["Distancia de impresión", "2 a 5 mm"],
        ["Tinta", "Tinta solvente de secado rápido, 42 ml"], ["Velocidad", "120 m/min"],
        ["Resolución horizontal", "100 / 120 / 150 / 200 / 300 / 600 DPI"], ["Resolución vertical", "300 / 600 DPI"],
        ["Códigos", "Code 128, Code 39, EAN8, EAN13, UPCA, ITF, QR, GS1DM y PDF417"],
        ["Puertos", "USB, alimentación, sensor fotoeléctrico y codificador"], ["Memoria", "8 GB"],
        ["Temperatura de trabajo", "5 °C a 35 °C"], ["Peso de embalaje", "4,60 kg"]
      ]
    },
    {
      slug: "banda-transportadora", nombre: "Banda transportadora", modelo: "BANDA-1500", tipo: "Accesorio", familia: "Automatización",
      disponibilidad: "bajo-pedido", disponibilidadTexto: "Disponible bajo pedido",
      resumen: "Se integra con codificadoras compatibles para mantener una producción continua.",
      descripcion: "Banda de acero inoxidable con velocidad ajustable, cinta de PVC y estructura preparada para integrar sensores y equipos de codificación.",
      imagen: "/assets/productos/banda-transportadora/principal.webp",
      galeria: ["/assets/productos/banda-transportadora/galeria-1.webp", "/assets/productos/banda-transportadora/galeria-2.webp"],
      altura: "No aplica", alturaFiltro: "No aplica",
      destacados: ["Estructura de acero inoxidable", "Velocidad ajustable de 0 a 25 m/min", "Longitud de 1500 mm", "Carga máxima de 5 kg"],
      especificaciones: [
        ["Garantía", "1 año por fallas de fábrica"], ["Material", "Acero inoxidable"],
        ["Longitud", "1500 mm"], ["Altura desde el suelo", "750 mm"],
        ["Ancho de banda", "200 mm con cinta de PVC negra de 2 mm"], ["Potencia del motor", "60 W"],
        ["Velocidad", "0 a 25 m/min, ajustable"], ["Tensión nominal", "220 V / 50 Hz"],
        ["Carga máxima", "5 kg"], ["Accionamiento", "Motor paso a paso"]
      ], compatibles: ["BT6205BL", "BT6210BL", "F61"]
    },
    {
      slug: "codificadora-huevos", nombre: "Codificadora de huevos", modelo: "EGG-CODER", tipo: "Codificadora", familia: "Especializada",
      disponibilidad: "bajo-pedido", disponibilidadTexto: "Disponible bajo pedido",
      resumen: "Sistema especializado para marcar huevos con fechas, textos, imágenes y logotipos.",
      descripcion: "Equipo metálico de codificación con boquillas TIJ, interfaz USB y capacidad aproximada de hasta 21.000 impresiones por hora.",
      imagen: "/assets/productos/codificadora-huevos/principal.webp",
      galeria: ["/assets/productos/codificadora-huevos/galeria-1.webp", "/assets/productos/codificadora-huevos/galeria-2.webp", "/assets/productos/codificadora-huevos/galeria-3.webp"],
      altura: "2 a 12,7 mm", alturaFiltro: "Variable",
      destacados: ["Hasta 21.000 impresiones por hora", "Altura ajustable de 2 a 12,7 mm", "Pantalla de 4,3 pulgadas", "Interfaz USB"],
      especificaciones: [
        ["Altura de impresión", "Ajustable de 2 a 12,7 mm"], ["Tecnología", "Inyección térmica TIJ"],
        ["Distancia de marcación", "2 a 5 mm"], ["Interfaz", "USB"], ["Pantalla", "4,3 pulgadas"],
        ["Material", "Estructura metálica"], ["Información imprimible", "Textos, fechas, imágenes y logotipos"],
        ["Tintas aplicables", "Base de aceite, base de agua y tinta UV"], ["Resolución", "150 a 300 DPI"],
        ["Eficiencia", "Aproximadamente 21.000 impresiones por hora"], ["Potencia", "60 W"],
        ["Dimensiones", "500 × 500 × 220 mm"], ["Peso", "15 kg"]
      ]
    },
    {
      slug: "g7", nombre: "Codificadora de etiquetas G7", modelo: "G7", tipo: "Codificadora", familia: "Inkjet tipo tableta",
      disponibilidad: "bajo-pedido", disponibilidadTexto: "Disponible bajo pedido",
      resumen: "Solución tipo tableta para etiquetas, disponible para integración con banda transportadora.",
      descripcion: "Codificadora industrial con pantalla táctil de 7 pulgadas, cabezal configurable y compatibilidad con bases de datos y múltiples códigos.",
      imagen: "/assets/productos/g7/principal.webp",
      galeria: ["/assets/productos/g7/galeria-1.webp", "/assets/productos/g7/galeria-2.webp"],
      altura: "12,7 / 25,4 mm", alturaFiltro: "Variable",
      destacados: ["Pantalla táctil de 7 pulgadas", "Altura de 12,7 o 25,4 mm", "Longitud de hasta 2000 mm", "Datos XLS, CSV, TXT y LOG"],
      especificaciones: [
        ["Pantalla", "Táctil de 7 pulgadas"], ["Cabezales", "1"], ["Distancia de impresión", "2 a 2,5 mm"],
        ["Altura de impresión", "12,7 / 25,4 mm"], ["Longitud de impresión", "2000 mm"],
        ["Resolución", "150 / 200 / 300 / 400 / 600 DPI"], ["Niveles de gris", "7"],
        ["Sistema operativo", "Linux"], ["Interfaz de datos", "Memoria USB"],
        ["Códigos", "QR, PDF417, Data Matrix, GS1, UPCA, UPCE, EAN13, EAN8, Code 39 y Code 128"],
        ["Formatos de imagen", "JPG, PNG y BMP"], ["Formatos de datos", "XLS, CSV, TXT y LOG"],
        ["Dimensiones del controlador", "179 × 115 × 34 mm"], ["Peso", "1,2 kg"]
      ]
    },
    {
      slug: "k600", nombre: "Codificadora industrial K600", modelo: "K600", tipo: "Codificadora", familia: "Industrial CIJ",
      disponibilidad: "bajo-pedido", disponibilidadTexto: "Disponible bajo pedido",
      resumen: "Solución industrial de codificación continua para líneas de producción de alta velocidad.",
      descripcion: "Equipo industrial adaptable a líneas alimenticias, químicas y farmacéuticas, con impresión continua, protección IP55 y múltiples interfaces de datos.",
      imagen: "/assets/productos/k600/principal.png",
      galeria: ["/assets/productos/k600/galeria-1.webp", "/assets/productos/k600/galeria-2.webp", "/assets/productos/k600/galeria-3.webp"],
      altura: "1 a 15 mm", alturaFiltro: "Variable",
      destacados: ["Impresión industrial continua", "Protección IP55", "Más de 1000 mensajes", "USB, RS485 y Ethernet"],
      especificaciones: [
        ["Garantía", "2 años por fallas de fábrica"], ["Material", "Acero inoxidable con recubrimiento de precisión"],
        ["Líneas de impresión", "1 a 5 líneas según matriz"], ["Altura de carácter", "1 a 15 mm"],
        ["Distancia de impresión", "2 a 30 mm; óptima de 10 mm"], ["Sistema", "Basado en Linux, pantalla táctil y varios idiomas"],
        ["Interfaces", "USB, RS485 y Ethernet"], ["Almacenamiento", "Más de 1000 mensajes"],
        ["Protección", "IP55"], ["Cabezal", "3 m, 50 / 60 / 70 μm"],
        ["Dirección de impresión", "Rotación completa de 360°"], ["Tinta / solvente", "500 ml / 750 ml"],
        ["Temperatura de trabajo", "0 °C a 45 °C"], ["Alimentación", "AC 100 - 240 V, 50/60 Hz, 80 VA"]
      ]
    }
  );

  var nombresEn = {
    m1: ["M1 Coding Printer", "Handheld", "Compact touchscreen printer for dry and frozen products.", "One-hand coding printer with a 3.5-inch touchscreen for dates, batches, text, logos and codes on flat, curved and rough surfaces.", ["3.5-inch touchscreen", "1 to 6 print lines", "4 to 6 hours of battery life", "300 DPI resolution"]],
    b15: ["B15 Coding Printer", "Wi-Fi handheld", "Wireless coding for dry, wet and frozen products.", "Compact printer controlled from an Android or iOS app through Wi-Fi, with fast-drying solvent ink for flexible production work.", ["Wi-Fi connection", "Android and iOS app", "1 to 5 print lines", "Fast-drying solvent ink"]],
    bt6205bl: ["BT6205BL Coding Printer", "Handheld and automatic", "Dual-use printer for handheld work or conveyor integration.", "Lightweight coding printer with a 4.3-inch display, photoelectric sensor port and removable battery for manual or automatic operation.", ["Handheld or automatic use", "Up to 16 hours of battery life", "4.3-inch HD display", "Photoelectric sensor port"]],
    bt6210bl: ["BT6210BL Coding Printer", "Handheld and automatic", "A 25.4 mm print height for applications that need more information per pass.", "Dual-use coding printer with a 25.4 mm print height, HD display and sensor connection for handheld or conveyor work.", ["Up to 10 print lines", "Up to 2 m print length", "16-hour battery", "Handheld and automatic operation"]],
    b45: ["B45 Coding Printer", "Industrial", "Large-format coding for text, logos and industrial marking.", "Two-ink industrial printer with a print height of up to 50 mm for handheld or automated production.", ["Up to 20 print lines", "50 mm print height", "Two inks", "Handheld or automatic use"]],
    b85: ["B85 Coding Printer", "Industrial large format", "The largest print height in the Rigel handheld range.", "Four-ink industrial printer for up to 40 lines and large-format customization in handheld or automatic mode.", ["Up to 40 print lines", "100 mm print height", "Four inks", "600 / 300 DPI resolution"]],
    bb22b: ["BENTSAI BB22B Ink", "Solvent ink", "Fast-drying solvent ink for 12.7 mm printing.", "Original BENTSAI ink for sharp and reliable printing on multiple materials.", ["Solvent ink", "Fast drying", "12.7 mm print height", "Original ink"]],
    eb21b: ["BENTSAI EB21B Ink", "Solvent ink", "Solvent ink for larger print heights and industrial applications.", "Original fast-drying BENTSAI ink for plastic, glass, metal, cardboard and other materials.", ["Solvent ink", "Fast drying", "Industrial use", "Original ink"]],
    eb22bl: ["BENTSAI EB22BL Ink", "Solvent ink", "Long-lasting original ink for industrial coding.", "BENTSAI solvent ink for larger print heights with fast adhesion and a defined finish.", ["Solvent ink", "Long lasting", "Industrial use", "Original ink"]],
    s70: ["S70 Ink", "Solvent ink", "12.7 mm solvent ink compatible with the M1.", "Consumable for dates, batches, text, logos and codes on different materials.", ["Solvent ink", "Fast drying", "12.7 mm", "Compatible with M1"]],
    sk10: ["SK10 Ink", "Solvent ink", "12.7 mm ink for handheld coding with the M1.", "Fast-drying solvent ink for sharp results on paper, plastic, cardboard and metal.", ["Solvent ink", "Fast drying", "12.7 mm", "Compatible with M1"]],
    m2: ["M2 Coding Printer", "Compact handheld", "Compact touchscreen printer with up to six print lines.", "Lightweight handheld printer for dates, batches, text, logos and codes on flat, curved and rough surfaces.", ["2.4-inch touchscreen", "1 to 6 print lines", "300 to 600 DPI", "185 g weight"]],
    f61: ["F61 Coding Printer", "Industrial inline", "High-speed solution designed for multiple production lines.", "Industrial printer with a 7-inch touchscreen, access control, external ports and a print speed of up to 120 m/min.", ["Up to 120 m/min", "7-inch HD touchscreen", "8 GB memory", "Sensor and encoder integration"]],
    "banda-transportadora": ["Conveyor Belt", "Automation", "Integrates with compatible printers for continuous production.", "Stainless-steel conveyor with adjustable speed, PVC belt and support for sensors and coding equipment.", ["Stainless-steel structure", "0 to 25 m/min adjustable speed", "1500 mm length", "5 kg maximum load"]],
    "codificadora-huevos": ["Egg Coding Printer", "Specialized", "Specialized system for printing dates, text, images and logos on eggs.", "Metal coding system with TIJ printheads, USB interface and an output of approximately 21,000 prints per hour.", ["About 21,000 prints per hour", "2 to 12.7 mm adjustable height", "4.3-inch display", "USB interface"]],
    g7: ["G7 Label Coding Printer", "Tablet-type inkjet", "Tablet-type solution for labels and conveyor integration.", "Industrial printer with a 7-inch touchscreen, configurable printhead and support for databases and multiple code formats.", ["7-inch touchscreen", "12.7 or 25.4 mm height", "Up to 2000 mm length", "XLS, CSV, TXT and LOG data"]],
    k600: ["K600 Industrial Coding Printer", "Industrial CIJ", "Continuous industrial coding for high-speed production lines.", "Industrial system for food, chemical and pharmaceutical lines, with IP55 protection and multiple data interfaces.", ["Continuous industrial printing", "IP55 protection", "More than 1,000 messages", "USB, RS485 and Ethernet"]]
  };

  var imagenesEn = {
    m1: ["/assets/productos/m1/galeria-4.webp"],
    b15: ["/assets/productos/b15/galeria-5.webp"],
    bt6205bl: ["/assets/productos/bt6205bl/galeria-4.webp"],
    bt6210bl: ["/assets/productos/bt6210bl/galeria-4.webp"],
    b45: ["/assets/productos/b45/galeria-4.webp"],
    b85: ["/assets/productos/b85/galeria-4.webp"]
  };

  var etiquetasEn = {
    "Garantía": "Warranty", "Pantalla": "Display", "Líneas de impresión": "Print lines", "Altura de impresión": "Print height",
    "Altura": "Print height", "Longitud de impresión": "Print length", "Distancia de impresión": "Print distance",
    "Distancia de marcación": "Marking distance", "Resolución": "Resolution", "Resolución horizontal": "Horizontal resolution",
    "Resolución vertical": "Vertical resolution", "Capacidad de tinta": "Ink capacity", "Tipo de tinta": "Ink type",
    "Colores de tinta": "Ink colors", "Formatos de imagen": "Image formats", "Formatos de datos": "Data formats",
    "Superficies": "Materials", "Batería": "Battery", "Peso": "Weight", "Peso de embalaje": "Package weight",
    "Dimensiones": "Dimensions", "Memoria interna": "Internal memory", "Memoria": "Memory", "Voltaje": "Voltage",
    "Conectividad": "Connectivity", "Interfaz": "Interface", "Velocidad": "Print speed", "Temperatura de trabajo": "Working temperature",
    "Sistema operativo": "Operating system", "Tamaño máximo de impresión": "Maximum print size", "Nivel de gris": "Gray level",
    "Tecnología": "Technology", "Compatibilidad": "Compatibility", "Sistema": "System", "Tinta": "Ink",
    "Códigos": "Codes", "Puertos": "Ports", "Material": "Material", "Longitud": "Length", "Altura desde el suelo": "Height from floor",
    "Ancho de banda": "Belt width", "Potencia del motor": "Motor power", "Tensión nominal": "Rated voltage", "Carga máxima": "Maximum load",
    "Accionamiento": "Drive", "Información imprimible": "Printable content", "Tintas aplicables": "Supported inks", "Eficiencia": "Output",
    "Potencia": "Power", "Cabezales": "Printheads", "Niveles de gris": "Gray levels", "Interfaz de datos": "Data interface",
    "Dimensiones del controlador": "Controller size", "Interfaces": "Interfaces", "Almacenamiento": "Storage", "Protección": "Protection",
    "Cabezal": "Printhead", "Altura de carácter": "Character height", "Dirección de impresión": "Print direction", "Tinta / solvente": "Ink / solvent", "Alimentación": "Power supply"
  };

  var valoresEn = {
    "Disponible": "Available", "Disponible bajo pedido": "Available on request", "No aplica": "Not applicable",
    "Tinta": "Ink", "Tinta solvente": "Solvent ink", "Manual de usuario": "User manual", "Cable USB tipo C": "USB-C cable",
    "Pendrive": "USB drive", "Lápiz óptico": "Stylus", "Manual": "Manual", "Regla de precisión": "Precision ruler",
    "Adaptador": "Adapter", "Cargador": "Charger", "Sensor": "Sensor", "Dos tintas": "Dual-ink system",
    "Inyector y adaptador": "Injector and adapter", "Regla": "Ruler", "Cuatro tintas": "Four-ink system", "Accesorios de precisión": "Precision accessories",
    "1 año por fallas de fábrica": "1 year against manufacturing defects", "2 años por fallas de fábrica": "2 years against manufacturing defects",
    "6 meses por fallas de fábrica": "6 months against manufacturing defects", "Táctil de 3,5 pulgadas": "3.5-inch touchscreen",
    "Táctil de 2,4 pulgadas": "2.4-inch touchscreen", "4,3 pulgadas de alta definición": "4.3-inch high-definition display",
    "5 pulgadas de alta definición": "5-inch high-definition display", "Táctil HD de 7 pulgadas": "7-inch HD touchscreen",
    "Táctil de 7 pulgadas": "7-inch touchscreen", "Aplicación para Android e iOS": "Android and iOS app",
    "Tinta solvente": "Solvent ink", "Tinta solvente de secado rápido, 42 ml": "42 ml fast-drying solvent ink",
    "Negro, azul, rojo, amarillo y blanco": "Black, blue, red, yellow and white", "Hasta 16 horas": "Up to 16 hours",
    "Hasta 8 horas": "Up to 8 hours", "4 a 6 horas": "4 to 6 hours", "Acero inoxidable": "Stainless steel",
    "Estructura metálica": "Metal structure", "Inyección térmica TIJ": "Thermal inkjet TIJ", "USB": "USB",
    "Ajustable de 2 a 12,7 mm": "Adjustable from 2 to 12.7 mm", "Textos, fechas, imágenes y logotipos": "Text, dates, images and logos",
    "Base de aceite, base de agua y tinta UV": "Oil-based, water-based and UV inks", "Aproximadamente 21.000 impresiones por hora": "Approximately 21,000 prints per hour",
    "Memoria USB": "USB drive", "Más de 1000 mensajes": "More than 1,000 messages", "Rotación completa de 360°": "Full 360° rotation",
    "Basado en Linux": "Linux-based", "Basado en Linux, pantalla táctil y varios idiomas": "Linux-based, touchscreen and multilingual",
    "110 V - 220 V / carga tipo C": "110 V - 220 V / USB-C charging", "Solvente de secado rápido": "Fast-drying solvent ink",
    "USB, alimentación, sensor fotoeléctrico y codificador": "USB, power, photoelectric sensor and encoder",
    "200 mm con cinta de PVC negra de 2 mm": "200 mm with a 2 mm black PVC belt", "Motor paso a paso": "Stepper motor",
    "Acero inoxidable con recubrimiento de precisión": "Stainless steel with precision coating",
    "1 a 5 líneas según matriz": "1 to 5 lines depending on the matrix", "2 a 30 mm; óptima de 10 mm": "2 to 30 mm; optimum 10 mm",
    "Cartón, tubo, cable, metal, plástico, aluminio, papel y más": "Cardboard, pipe, cable, metal, plastic, aluminum, paper and more",
    "Plástico, vidrio, metal, cables, aluminio, cartón corrugado, algodón y más": "Plastic, glass, metal, cables, aluminum, corrugated cardboard, cotton and more"
  };

  function traducirValor(valor) {
    if (valoresEn[valor]) return valoresEn[valor];
    return String(valor)
      .replace(/(\d(?:[.,]\d+)?) a (\d)/g, "$1 to $2")
      .replace(/ y /g, " and ")
      .replace(/líneas/g, "lines").replace(/pulg/g, "in").replace(/horas/g, "hours")
      .replace(/ajustable/g, "adjustable").replace(/por fallas de fábrica/g, "against manufacturing defects")
      .replace(/Negro/g, "Black").replace(/azul/g, "blue").replace(/rojo/g, "red").replace(/amarillo/g, "yellow").replace(/blanco/g, "white")
      .replace(/Cartón, tubo, cable, metal, plástico, aluminio, papel y más/g, "Cardboard, pipe, cable, metal, plastic, aluminum, paper and more")
      .replace(/Plástico, vidrio, metal, cables, aluminio, cartón corrugado, algodón y más/g, "Plastic, glass, metal, cables, aluminum, corrugated cardboard, cotton and more");
  }

  data.productosEn = data.productos.map(function (producto) {
    var traduccion = nombresEn[producto.slug];
    var imagenes = imagenesEn[producto.slug];
    return Object.assign({}, producto, {
      nombre: traduccion[0], familia: traduccion[1], resumen: traduccion[2], descripcion: traduccion[3], destacados: traduccion[4],
      tipo: producto.tipo === "Codificadora" ? "Coding printer" : (producto.tipo === "Tinta" ? "Ink" : "Accessory"),
      disponibilidadTexto: producto.disponibilidad === "disponible" ? "Available" : "Available on request",
      altura: traducirValor(producto.altura),
      alturaFiltro: traducirValor(producto.alturaFiltro),
      ficha: producto.fichaEn || producto.ficha,
      imagen: imagenes ? imagenes[0] : producto.imagen,
      galeria: imagenes ? imagenes.slice(1) : producto.galeria,
      incluye: (producto.incluye || []).map(traducirValor),
      especificaciones: producto.especificaciones.map(function (fila) { return [etiquetasEn[fila[0]] || fila[0], traducirValor(fila[1])]; })
    });
  });

  var articulosEn = [
    {
      slug: "que-es-una-codificadora-fechadora", title: "Handheld printer: what is it?", excerpt: "A compact and intuitive solution for printing dates, text, codes and more on different materials.", category: "Introduction",
      sections: [
        { paragraphs: ["A handheld printer is a compact technological solution that simplifies coding and printing dates, text, codes and other information on different surfaces."] },
        { title: "Main features", points: [
          { title: "Handheld", text: "Its compact size and low weight make it easy to operate with one hand." },
          { title: "Touchscreen", text: "The integrated display uses intuitive software for quick editing." },
          { title: "Printing", text: "Fast-drying solvent ink adheres to paper, plastic, cardboard, metal and more." },
          { title: "Battery", text: "Depending on the model, battery life ranges from 4 to 16 hours." }
        ] },
        { title: "How it works", paragraphs: ["The user enters text, dates, logos, QR codes or barcodes on the touchscreen and moves the printer across the product at the recommended distance."] }
      ]
    },
    {
      slug: "fecha-elaboracion-vencimiento-productos", title: "Manufacturing and expiration dates", excerpt: "Why these dates matter for consumer safety, traceability and inventory control.", category: "Best practices",
      sections: [
        { title: "Why include them?", paragraphs: ["Manufacturing and expiration dates help protect consumers and identify when a product was made and how long it should retain its intended quality."] },
        { title: "How dates are established", paragraphs: ["Stability tests under different conditions help determine a safe period for storage and use."] },
        { title: "Value for your operation", paragraphs: ["Clear dates improve safety, stock rotation and responsible purchasing decisions."] }
      ]
    },
    {
      slug: "beneficios-codificadora-fechadora-negocio", title: "Benefits of adding a handheld printer", excerpt: "Versatility, accuracy and speed for pharmaceutical, food, agricultural and packaging production.", category: "Production",
      sections: [
        { paragraphs: ["Handheld printers improve production by providing a fast and flexible way to mark products across many industries."] },
        { title: "Common uses", points: [
          { title: "Dates and batches", text: "Print manufacturing dates, expiration dates and batch numbers." },
          { title: "Identification", text: "Add barcodes or serial numbers for better inventory control." },
          { title: "Variable information", text: "Include changing production information directly on products." },
          { title: "QR codes", text: "Improve traceability and access to digital product information." }
        ] },
        { paragraphs: ["Their low weight supports different work areas, while compatible models can also operate automatically on a conveyor."] }
      ]
    },
    {
      slug: "codificadora-ideal-para-tu-negocio", title: "Which coding printer is right for your business?", excerpt: "A practical guide based on production size, print height and operating mode.", category: "Selection guide",
      sections: [
        { title: "Small operations", paragraphs: ["M1, M2 and B15 are compact options for businesses that need portable date, batch, text and code printing."] },
        { title: "Growing operations", paragraphs: ["BT6205BL and BT6210BL offer longer battery life and can work by hand or with a conveyor belt."] },
        { title: "Industrial applications", paragraphs: ["B45, B85, F61, G7 and K600 cover larger print heights, automatic production and specialized line integration."] }
      ]
    },
    {
      slug: "extender-vida-tinta", title: "How to extend ink life", excerpt: "Cleaning and storage practices that help maintain print quality.", category: "Maintenance",
      video: "https://www.youtube.com/watch?v=cbf6daTScR8",
      sections: [
        { title: "Cleaning", paragraphs: ["With the ink capped, shake it gently for 30 seconds. Then use a microfiber cloth lightly moistened with alcohol and clean the nozzle from top to bottom."] },
        { title: "Storage", paragraphs: ["Remove the ink after use, replace its cover and store it in a cool and dry place away from high temperatures and humidity."] }
      ]
    },
    {
      slug: "agregar-textos-fechas-codigos", title: "Add text, dates, logos and codes", excerpt: "How to prepare variable information from the printer interface or a USB drive.", category: "Tutorial",
      sections: [
        { title: "Text and dates", paragraphs: ["Open the editing section, choose Text and enter the information. Adjust font, size, spacing and style before confirming."] },
        { title: "Logos", paragraphs: ["Save the logo as PNG or JPG on a USB drive, open Image from the editing menu and select the file."] },
        { title: "Barcodes and QR codes", paragraphs: ["Choose Code or QR, enter the required information, adjust the format and confirm the final size."] }
      ]
    },
    {
      slug: "por-que-escoger-tinta-bentsai", title: "Why choose a BENTSAI ink?", excerpt: "Original solvent ink for clear, fast-drying and durable results.", category: "Consumables",
      sections: [
        { paragraphs: ["BENTSAI inks use fast-drying solvent ink designed to produce clear and sharp prints on a wide range of materials."] },
        { title: "Performance", paragraphs: ["The ink adheres quickly, supports low-temperature applications and helps reduce nozzle drying when the ink is maintained correctly."] }
      ]
    },
    {
      slug: "codificacion-secuencial", title: "Sequential coding", excerpt: "Prepare a database so the printer advances variable information automatically.", category: "Tutorial",
      sections: [
        { title: "Prepare the database", paragraphs: ["Create the sequence in a spreadsheet without blank cells and save it as a UTF-8 CSV file."] },
        { title: "Load the file", paragraphs: ["Save the file in the database folder on the USB drive, insert it into the printer and open it from Editing, More and Storage."] },
        { title: "Select the output", paragraphs: ["Choose variable text, QR code or barcode, confirm the starting value and review the sequence before printing."] }
      ]
    },
    {
      slug: "codificacion-automatica", title: "Automatic coding", excerpt: "Connect a compatible printer to a conveyor belt and increase production continuity.", category: "Automation",
      sections: [
        { paragraphs: ["Compatible BT printers can operate manually or automatically, adapting to changing production requirements."] },
        { title: "Advantages", points: [
          { title: "Higher throughput", text: "A conveyor increases the number of prints and reduces handling errors." },
          { title: "Variable data", text: "Sequential databases keep changing information organized." },
          { title: "Continuity", text: "Automation helps keep the line moving during normal operating changes." }
        ] },
        { title: "Setup", paragraphs: ["Select Induction mode in the print settings, adjust the delay, connect the sensor and position it toward the products before starting the line."] }
      ]
    }
  ];

  data.articulosEn = data.articulos.map(function (articulo) {
    var en = articulosEn.find(function (item) { return item.slug === articulo.slug; });
    return Object.assign({}, articulo, {
      titulo: en.title, extracto: en.excerpt, categoria: en.category, video: en.video || articulo.video,
      secciones: en.sections.map(function (section) {
        return {
          titulo: section.title,
          parrafos: section.paragraphs,
          puntos: section.points ? section.points.map(function (point) { return { titulo: point.title, texto: point.text }; }) : undefined
        };
      })
    });
  });
}());
