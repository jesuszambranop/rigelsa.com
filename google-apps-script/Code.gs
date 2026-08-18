const SHEET_ID = "1C3j9x20L2SnsjahW8sY9Ze-OzcJIkAeQuVWHN3TQIic";

function doPost(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const values = event && event.parameter ? event.parameter : {};
    if (values.website) return response({ ok: true });

    const nombre = clean(values.nombre, 160);
    const empresa = clean(values.empresa, 200);
    const correo = clean(values.correo, 240);
    const mensaje = clean(values.mensaje, 5000);
    const fecha = clean(values.fecha, 80) || Utilities.formatDate(new Date(), "America/Guayaquil", "yyyy-MM-dd HH:mm:ss");

    if (!nombre || !empresa || !correo || !mensaje) {
      return response({ ok: false, error: "missing_fields" });
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([["FECHA Y HORA", "NOMBRE", "EMPRESA", "CORREO", "MENSAJE"]]);
    } else if (sheet.getLastColumn() < 5) {
      sheet.insertColumnBefore(1);
      sheet.getRange(1, 1).setValue("FECHA Y HORA");
    }
    sheet.appendRow([fecha, nombre, empresa, correo, mensaje]);
    return response({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function clean(value, maximum) {
  return String(value || "").trim().slice(0, maximum);
}

function response(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
