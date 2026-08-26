#!/usr/bin/env python3
"""Validación local del frontend estático de Rigel."""

from __future__ import annotations

import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_PAGES = sorted(ROOT.glob("*.html"))
REQUIRED_PAGES = {
    "index.html",
    "productos.html",
    "catalogo.html",
    "quienes-somos.html",
    "producto.html",
    "blog.html",
    "articulo.html",
    "contacto.html",
}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.references: list[str] = []
        self.title = False
        self.viewport = False
        self.language = False

    def handle_starttag(self, tag: str, attrs) -> None:
        values = dict(attrs)
        if tag == "html" and values.get("lang"):
            self.language = True
        if tag == "title":
            self.title = True
        if tag == "meta" and values.get("name", "").lower() == "viewport":
            self.viewport = True
        if values.get("id"):
            self.ids.append(values["id"])
        for attribute in ("href", "src", "srcset"):
            if values.get(attribute):
                self.references.extend(part.strip().split()[0] for part in values[attribute].split(","))


def local_target(reference: str, base: Path = ROOT) -> Path | None:
    reference = reference.strip()
    if not reference or reference.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
        return None
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc:
        return None
    raw_path = unquote(parsed.path)
    path = raw_path.lstrip("/")
    if not path:
        return None
    return (ROOT if raw_path.startswith("/") else base) / path


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    existing_pages = {page.name for page in PUBLIC_PAGES}
    missing_pages = sorted(REQUIRED_PAGES - existing_pages)
    if missing_pages:
        errors.append(f"Páginas obligatorias ausentes: {', '.join(missing_pages)}")

    for page in PUBLIC_PAGES:
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        if not parser.title:
            errors.append(f"{page.name}: falta <title>.")
        if not parser.viewport:
            errors.append(f"{page.name}: falta meta viewport.")
        if not parser.language:
            errors.append(f"{page.name}: falta el atributo lang.")
        duplicates = sorted({value for value in parser.ids if parser.ids.count(value) > 1})
        if duplicates:
            errors.append(f"{page.name}: IDs duplicados: {', '.join(duplicates)}")
        for reference in parser.references:
            target = local_target(reference)
            if target and not target.is_file():
                errors.append(f"{page.name}: recurso inexistente {reference}")

    css = (ROOT / "css" / "styles.css").read_text(encoding="utf-8")
    for reference in re.findall(r"url\(\s*['\"]?([^)'\"]+)", css):
        target = local_target(reference, ROOT / "css")
        if target and not target.is_file():
            errors.append(f"css/styles.css: recurso inexistente {reference}")

    app_source = (ROOT / "js" / "app.js").read_text(encoding="utf-8")
    form_markers = [
        "docs.google.com/forms/d/e/",
        "/formResponse",
        "entry.1511391054",
        "entry.1127554998",
        "entry.271073587",
        "entry.874449950",
    ]
    for marker in form_markers:
        if marker not in app_source:
            errors.append(f"Formulario de contacto: falta {marker}")

    ignored_directories = {".git", ".venv", "__pycache__"}
    for path in ROOT.rglob("*"):
        if any(part in ignored_directories for part in path.relative_to(ROOT).parts):
            continue
        if path.is_file() and path.stat().st_size > 2_000_000:
            warnings.append(f"Archivo pesado ({path.stat().st_size / 1_000_000:.1f} MB): {path.relative_to(ROOT)}")

    for script in sorted((ROOT / "js").glob("*.js")):
        run(["node", "--check", str(script)])
    run(["node", str(ROOT / "scripts" / "validate_data.cjs")])
    run([sys.executable, "-m", "py_compile", str(ROOT / "backend" / "app.py")])

    if warnings:
        print("Advertencias de rendimiento:")
        for warning in warnings:
            print(f"- {warning}")

    if errors:
        print("Errores:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(f"Frontend correcto: {len(PUBLIC_PAGES)} páginas HTML verificadas.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
