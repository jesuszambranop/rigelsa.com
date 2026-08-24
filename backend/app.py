"""Backend sencillo para el sitio Rigel.

Sirve la web, conserva contactos con fecha/hora y permite administrar el
inventario desde /admin. La base usa SQLite y no requiere una cuenta externa.
"""

from __future__ import annotations

import csv
import io
import json
import os
import re
import secrets
import sqlite3
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from functools import wraps
from pathlib import Path

from flask import Flask, Response, abort, jsonify, request, send_file, send_from_directory
from openpyxl import Workbook
from werkzeug.utils import secure_filename


BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent


def configured_path(variable: str, default: Path) -> Path:
    value = Path(os.environ.get(variable, str(default))).expanduser()
    return (value if value.is_absolute() else PROJECT_ROOT / value).resolve()


DATA_DIR = configured_path("RIGEL_DATA_DIR", BACKEND_DIR / "data")
DATABASE_PATH = configured_path("RIGEL_DATABASE", DATA_DIR / "rigel.sqlite3")
UPLOAD_DIR = configured_path("RIGEL_UPLOAD_DIR", DATA_DIR / "uploads")
SEED_PATH = BACKEND_DIR / "data" / "seed_products.json"
ALLOWED_UPLOADS = {"png", "jpg", "jpeg", "webp", "gif", "pdf"}

DATA_DIR.mkdir(parents=True, exist_ok=True)
DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = Flask(__name__, static_folder=None)
app.config["MAX_CONTENT_LENGTH"] = int(os.environ.get("RIGEL_MAX_UPLOAD_MB", "16")) * 1024 * 1024


def now_ecuador() -> str:
    # Ecuador continental usa UTC-05:00 durante todo el año.
    return datetime.now(timezone(timedelta(hours=-5))).isoformat(timespec="seconds")


def db_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def initialize_database() -> None:
    with db_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                company TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                language TEXT NOT NULL DEFAULT 'es',
                created_at TEXT NOT NULL,
                ip_address TEXT,
                user_agent TEXT
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS products (
                slug TEXT PRIMARY KEY,
                es_json TEXT NOT NULL,
                en_json TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'bajo-pedido',
                stock_quantity INTEGER,
                sort_order INTEGER NOT NULL DEFAULT 0,
                updated_at TEXT NOT NULL
            )
            """
        )
        connection.execute(
            "CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC)"
        )
        connection.execute(
            "CREATE INDEX IF NOT EXISTS idx_products_status ON products(status)"
        )
        product_count = connection.execute("SELECT COUNT(*) FROM products").fetchone()[0]
        if product_count == 0 and SEED_PATH.exists():
            for item in json.loads(SEED_PATH.read_text(encoding="utf-8")):
                connection.execute(
                    """
                    INSERT INTO products
                    (slug, es_json, en_json, status, stock_quantity, sort_order, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        item["slug"],
                        json.dumps(item["es"], ensure_ascii=False),
                        json.dumps(item["en"], ensure_ascii=False),
                        item.get("status", "bajo-pedido"),
                        item.get("stock_quantity"),
                        item.get("sort_order", 0),
                        now_ecuador(),
                    ),
                )
        connection.execute("PRAGMA optimize")


initialize_database()


def admin_credentials() -> tuple[str, str] | None:
    """Return configured credentials or local-only development defaults.

    Production hosts must define both environment variables. The familiar
    admin/rigel-admin pair remains available only when the request itself uses
    localhost and RIGEL_ALLOW_LOCAL_DEFAULTS has not been disabled.
    """

    configured_user = os.environ.get("RIGEL_ADMIN_USER", "").strip()
    configured_password = os.environ.get("RIGEL_ADMIN_PASSWORD", "").strip()
    if configured_user and configured_password:
        return configured_user, configured_password

    local_defaults_allowed = os.environ.get("RIGEL_ALLOW_LOCAL_DEFAULTS", "1") == "1"
    raw_host = request.host.lower()
    request_host = raw_host[1:raw_host.find("]")] if raw_host.startswith("[") and "]" in raw_host else raw_host.split(":", 1)[0]
    if local_defaults_allowed and request_host in {"127.0.0.1", "localhost", "::1"}:
        return "admin", "rigel-admin"
    return None


def admin_required(function):
    @wraps(function)
    def wrapped(*args, **kwargs):
        credentials = admin_credentials()
        if credentials is None:
            return Response(
                "La administración no está configurada. Define RIGEL_ADMIN_USER y RIGEL_ADMIN_PASSWORD.",
                503,
                {"Content-Type": "text/plain; charset=utf-8"},
            )
        auth = request.authorization
        expected_user, expected_password = credentials
        if not auth or not (
            secrets.compare_digest(auth.username or "", expected_user)
            and secrets.compare_digest(auth.password or "", expected_password)
        ):
            return Response(
                "Se requiere acceso administrativo.",
                401,
                {"WWW-Authenticate": 'Basic realm="Administración Rigel"'},
            )
        return function(*args, **kwargs)

    return wrapped


def clean_text(value, max_length: int) -> str:
    return str(value or "").strip()[:max_length]


def public_product_rows():
    with db_connection() as connection:
        return connection.execute(
            "SELECT * FROM products ORDER BY sort_order, slug"
        ).fetchall()


def product_payload(rows) -> dict:
    spanish = []
    english = []
    status_es = {
        "disponible": "Disponible",
        "bajo-pedido": "Disponible bajo pedido",
        "no-disponible": "No disponible",
    }
    status_en = {
        "disponible": "Available",
        "bajo-pedido": "Available on request",
        "no-disponible": "Unavailable",
    }
    for row in rows:
        es = json.loads(row["es_json"])
        en = json.loads(row["en_json"])
        for item, labels in ((es, status_es), (en, status_en)):
            item["disponibilidad"] = row["status"]
            item["disponibilidadTexto"] = labels.get(row["status"], labels["bajo-pedido"])
            item["stockCantidad"] = row["stock_quantity"]
        spanish.append(es)
        english.append(en)
    return {"productos": spanish, "productosEn": english}


@app.get("/api/health")
def health():
    return jsonify({"ok": True, "service": "rigel-backend"})


@app.get("/api/products")
def products():
    return jsonify(product_payload(public_product_rows()))


def forward_to_google_sheet(contact: dict) -> None:
    endpoint = os.environ.get("GOOGLE_SHEETS_WEBHOOK_URL", "").strip()
    if not endpoint.startswith("https://script.google.com/macros/s/"):
        return
    body = urllib.parse.urlencode(
        {
            "nombre": contact["name"],
            "empresa": contact["company"],
            "correo": contact["email"],
            "mensaje": contact["message"],
            "fecha": contact["created_at"],
        }
    ).encode("utf-8")
    try:
        urllib.request.urlopen(endpoint, data=body, timeout=4).read(256)
    except Exception:
        # El contacto ya quedó guardado localmente. La sincronización es opcional.
        pass


@app.post("/api/contact")
def save_contact():
    payload = request.get_json(silent=True) or request.form
    if clean_text(payload.get("website"), 200):
        return jsonify({"ok": True})

    contact = {
        "name": clean_text(payload.get("nombre") or payload.get("name"), 120),
        "company": clean_text(payload.get("empresa") or payload.get("company"), 160),
        "email": clean_text(payload.get("correo") or payload.get("email"), 180),
        "message": clean_text(payload.get("mensaje") or payload.get("message"), 4000),
        "language": clean_text(payload.get("idioma") or payload.get("language") or "es", 5),
        "created_at": now_ecuador(),
    }
    if not all(contact[key] for key in ("name", "company", "email", "message")):
        return jsonify({"ok": False, "error": "missing_fields"}), 400
    if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", contact["email"]):
        return jsonify({"ok": False, "error": "invalid_email"}), 400

    with db_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO contacts
            (name, company, email, message, language, created_at, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                contact["name"],
                contact["company"],
                contact["email"],
                contact["message"],
                contact["language"],
                contact["created_at"],
                request.headers.get("X-Forwarded-For", request.remote_addr or "").split(",")[0].strip(),
                clean_text(request.headers.get("User-Agent"), 300),
            ),
        )
        contact["id"] = cursor.lastrowid

    forward_to_google_sheet(contact)
    return jsonify({"ok": True, "id": contact["id"], "timestamp": contact["created_at"]}), 201


def parse_lines(value: str) -> list[str]:
    return [line.strip() for line in str(value or "").splitlines() if line.strip()]


def parse_specs(value: str) -> list[list[str]]:
    rows = []
    for line in parse_lines(value):
        parts = re.split(r"\s*[|:]\s*", line, maxsplit=1)
        if len(parts) == 2 and parts[0] and parts[1]:
            rows.append([parts[0], parts[1]])
    return rows


def save_upload(file_storage, slug: str) -> str | None:
    if not file_storage or not file_storage.filename:
        return None
    safe_name = secure_filename(file_storage.filename)
    extension = safe_name.rsplit(".", 1)[-1].lower() if "." in safe_name else ""
    if extension not in ALLOWED_UPLOADS:
        raise ValueError("unsupported_file")
    product_dir = UPLOAD_DIR / slug
    product_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    final_name = f"{timestamp}-{safe_name}"
    file_storage.save(product_dir / final_name)
    return f"media/{slug}/{final_name}"


def type_in_english(type_es: str) -> str:
    return {
        "Codificadora": "Coding printer",
        "Tinta": "Ink",
        "Accesorio": "Accessory",
    }.get(type_es, type_es or "Product")


def build_product_from_form(existing_es=None, existing_en=None):
    form = request.form
    slug = clean_text(form.get("slug"), 80).lower()
    slug = re.sub(r"[^a-z0-9-]+", "-", slug).strip("-")
    if not slug:
        raise ValueError("invalid_slug")

    es = dict(existing_es or {})
    en = dict(existing_en or {})
    type_es = clean_text(form.get("type_es") or es.get("tipo") or "Codificadora", 80)
    common = {
        "slug": slug,
        "modelo": clean_text(form.get("model") or es.get("modelo") or slug.upper(), 80),
        "altura": clean_text(form.get("height") or es.get("altura") or "No aplica", 80),
        "alturaFiltro": clean_text(form.get("height_filter") or es.get("alturaFiltro") or "No aplica", 80),
        "video": clean_text(form.get("video") or es.get("video"), 500),
    }
    es.update(common)
    en.update(common)
    es.update(
        {
            "nombre": clean_text(form.get("name_es") or es.get("nombre") or common["modelo"], 180),
            "tipo": type_es,
            "familia": clean_text(form.get("family_es") or es.get("familia") or "Producto Rigel", 120),
            "resumen": clean_text(form.get("summary_es") or es.get("resumen"), 500),
            "descripcion": clean_text(form.get("description_es") or es.get("descripcion"), 1500),
        }
    )
    en.update(
        {
            "nombre": clean_text(form.get("name_en") or en.get("nombre") or es["nombre"], 180),
            "tipo": clean_text(form.get("type_en") or en.get("tipo") or type_in_english(type_es), 80),
            "familia": clean_text(form.get("family_en") or en.get("familia") or es["familia"], 120),
            "resumen": clean_text(form.get("summary_en") or en.get("resumen") or es["resumen"], 500),
            "descripcion": clean_text(form.get("description_en") or en.get("descripcion") or es["descripcion"], 1500),
        }
    )

    for item, feature_key, spec_key in (
        (es, "features_es", "specs_es"),
        (en, "features_en", "specs_en"),
    ):
        features = parse_lines(form.get(feature_key, ""))
        specs = parse_specs(form.get(spec_key, ""))
        if features:
            item["destacados"] = features
        else:
            item.setdefault("destacados", [])
        if specs:
            item["especificaciones"] = specs
        else:
            item.setdefault("especificaciones", [])

    image_path = clean_text(form.get("image_path"), 500)
    uploaded_image = save_upload(request.files.get("image_file"), slug)
    image = uploaded_image or image_path or es.get("imagen") or "assets/brand/rigel-favicon.png"
    es["imagen"] = image
    en["imagen"] = image

    gallery = list(es.get("galeria") or [])
    if form.get("replace_gallery") == "1":
        gallery = []
    for uploaded in request.files.getlist("gallery_files"):
        saved = save_upload(uploaded, slug)
        if saved:
            gallery.append(saved)
    es["galeria"] = gallery
    en["galeria"] = list(gallery)

    technical_es = clean_text(form.get("technical_sheet_es") or es.get("ficha"), 500)
    technical_en = clean_text(form.get("technical_sheet_en") or en.get("ficha"), 500)
    if technical_es:
        es["ficha"] = technical_es
    if technical_en:
        en["ficha"] = technical_en

    status = clean_text(form.get("status") or "bajo-pedido", 30)
    if status not in {"disponible", "bajo-pedido", "no-disponible"}:
        status = "bajo-pedido"
    stock_raw = clean_text(form.get("stock_quantity"), 20)
    stock_quantity = max(0, int(stock_raw)) if stock_raw.isdigit() else None
    sort_raw = clean_text(form.get("sort_order"), 12)
    sort_order = int(sort_raw) if re.fullmatch(r"-?\d+", sort_raw) else 999
    return slug, es, en, status, stock_quantity, sort_order


@app.get("/admin")
@admin_required
def admin_page():
    return send_from_directory(BACKEND_DIR, "admin.html")


@app.get("/api/admin/products")
@admin_required
def admin_products():
    rows = public_product_rows()
    result = []
    for row in rows:
        result.append(
            {
                "slug": row["slug"],
                "es": json.loads(row["es_json"]),
                "en": json.loads(row["en_json"]),
                "status": row["status"],
                "stock_quantity": row["stock_quantity"],
                "sort_order": row["sort_order"],
                "updated_at": row["updated_at"],
            }
        )
    return jsonify(result)


@app.post("/api/admin/products")
@admin_required
def admin_save_product():
    original_slug = clean_text(request.form.get("original_slug"), 80)
    existing_es = existing_en = None
    if original_slug:
        with db_connection() as connection:
            current = connection.execute("SELECT * FROM products WHERE slug = ?", (original_slug,)).fetchone()
        if current:
            existing_es = json.loads(current["es_json"])
            existing_en = json.loads(current["en_json"])
    try:
        slug, es, en, status, stock_quantity, sort_order = build_product_from_form(existing_es, existing_en)
    except (ValueError, OSError) as error:
        return jsonify({"ok": False, "error": str(error)}), 400

    with db_connection() as connection:
        if original_slug and original_slug != slug:
            connection.execute("DELETE FROM products WHERE slug = ?", (original_slug,))
        connection.execute(
            """
            INSERT INTO products
            (slug, es_json, en_json, status, stock_quantity, sort_order, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(slug) DO UPDATE SET
                es_json = excluded.es_json,
                en_json = excluded.en_json,
                status = excluded.status,
                stock_quantity = excluded.stock_quantity,
                sort_order = excluded.sort_order,
                updated_at = excluded.updated_at
            """,
            (
                slug,
                json.dumps(es, ensure_ascii=False),
                json.dumps(en, ensure_ascii=False),
                status,
                stock_quantity,
                sort_order,
                now_ecuador(),
            ),
        )
    return jsonify({"ok": True, "slug": slug})


@app.get("/api/admin/contacts")
@admin_required
def admin_contacts():
    with db_connection() as connection:
        rows = connection.execute(
            "SELECT id, name, company, email, message, language, created_at FROM contacts ORDER BY created_at DESC"
        ).fetchall()
    return jsonify([dict(row) for row in rows])


def all_contacts():
    with db_connection() as connection:
        return connection.execute(
            "SELECT id, created_at, name, company, email, message, language FROM contacts ORDER BY created_at DESC"
        ).fetchall()


@app.get("/admin/contactos.csv")
@admin_required
def contacts_csv():
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "FECHA Y HORA", "NOMBRE", "EMPRESA", "CORREO", "MENSAJE", "IDIOMA"])
    for row in all_contacts():
        writer.writerow(list(row))
    data = ("\ufeff" + output.getvalue()).encode("utf-8")
    return Response(
        data,
        mimetype="text/csv; charset=utf-8",
        headers={"Content-Disposition": "attachment; filename=clientes-rigel.csv"},
    )


@app.get("/admin/contactos.xlsx")
@admin_required
def contacts_xlsx():
    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Clientes"
    sheet.append(["ID", "FECHA Y HORA", "NOMBRE", "EMPRESA", "CORREO", "MENSAJE", "IDIOMA"])
    for row in all_contacts():
        sheet.append(list(row))
    sheet.freeze_panes = "A2"
    sheet.auto_filter.ref = sheet.dimensions
    widths = {"A": 8, "B": 24, "C": 24, "D": 28, "E": 32, "F": 60, "G": 10}
    for column, width in widths.items():
        sheet.column_dimensions[column].width = width
    buffer = io.BytesIO()
    workbook.save(buffer)
    buffer.seek(0)
    return send_file(
        buffer,
        as_attachment=True,
        download_name="clientes-rigel.xlsx",
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@app.get("/admin/respaldo.json")
@admin_required
def backup_json():
    contacts = [dict(row) for row in all_contacts()]
    products_data = json.loads(admin_products().get_data(as_text=True))
    buffer = io.BytesIO(
        json.dumps(
            {"generated_at": now_ecuador(), "products": products_data, "contacts": contacts},
            ensure_ascii=False,
            indent=2,
        ).encode("utf-8")
    )
    return send_file(buffer, as_attachment=True, download_name="respaldo-rigel.json", mimetype="application/json")


@app.get("/")
def index():
    return send_from_directory(PROJECT_ROOT, "index.html")


@app.get("/media/<path:filename>")
def uploaded_media(filename: str):
    requested = (UPLOAD_DIR / filename).resolve()
    try:
        requested.relative_to(UPLOAD_DIR.resolve())
    except ValueError:
        abort(404)
    if not requested.is_file():
        abort(404)
    return send_from_directory(requested.parent, requested.name)


@app.get("/<path:filename>")
def static_files(filename: str):
    public_pages = {
        "index.html", "productos.html", "catalogo.html", "quienes-somos.html", "producto.html",
        "blog.html", "articulo.html", "contacto.html", "og.png",
    }
    first_part = Path(filename).parts[0] if Path(filename).parts else ""
    if filename not in public_pages and first_part not in {"assets", "css", "js"}:
        abort(404)
    requested = (PROJECT_ROOT / filename).resolve()
    try:
        requested.relative_to(PROJECT_ROOT.resolve())
    except ValueError:
        abort(404)
    if not requested.is_file():
        abort(404)
    return send_from_directory(requested.parent, requested.name)


if __name__ == "__main__":
    app.run(
        host=os.environ.get("RIGEL_HOST", "127.0.0.1"),
        port=int(os.environ.get("PORT", "5000")),
        debug=os.environ.get("RIGEL_DEBUG", "0") == "1",
    )

