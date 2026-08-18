#!/usr/bin/env python3
"""Prueba funcional del backend sin escribir dentro del repositorio."""

from __future__ import annotations

import base64
import importlib.util
import os
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def expect(response, status: int, label: str) -> None:
    if response.status_code != status:
        raise AssertionError(f"{label}: se esperaba {status} y se recibió {response.status_code}")


with tempfile.TemporaryDirectory(prefix="rigel-backend-test-") as data_dir:
    os.environ["RIGEL_DATA_DIR"] = data_dir
    os.environ["RIGEL_ADMIN_USER"] = "rigel-test-admin"
    os.environ["RIGEL_ADMIN_PASSWORD"] = "rigel-test-password"
    os.environ["RIGEL_ALLOW_LOCAL_DEFAULTS"] = "0"

    spec = importlib.util.spec_from_file_location("rigel_backend", ROOT / "backend" / "app.py")
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    client = module.app.test_client()

    credentials = base64.b64encode(b"rigel-test-admin:rigel-test-password").decode("ascii")
    authorization = {"Authorization": f"Basic {credentials}"}

    expect(client.get("/"), 200, "Inicio")
    expect(client.get("/contacto.html"), 200, "Contacto")
    expect(client.get("/api/health"), 200, "Salud de API")
    products = client.get("/api/products")
    expect(products, 200, "Productos")
    if len(products.get_json().get("productos", [])) != 17:
        raise AssertionError("La API no devolvió los 17 productos esperados.")

    expect(client.get("/admin"), 401, "Admin sin credenciales")
    expect(client.get("/admin", headers=authorization), 200, "Admin autenticado")

    contact = client.post(
        "/api/contact",
        json={
            "name": "Prueba automática",
            "company": "Rigel QA",
            "email": "qa@example.com",
            "message": "Validación local del repositorio",
            "language": "es",
        },
    )
    expect(contact, 201, "Registro de contacto")
    if not contact.get_json().get("ok"):
        raise AssertionError("La API no confirmó el contacto de prueba.")

    expect(client.get("/api/admin/contacts", headers=authorization), 200, "Contactos admin")
    expect(client.get("/admin/contactos.csv", headers=authorization), 200, "Exportación CSV")
    expect(client.get("/admin/contactos.xlsx", headers=authorization), 200, "Exportación Excel")

print("Backend correcto: rutas, autenticación, inventario, contacto y exportaciones verificadas.")
