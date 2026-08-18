"""Punto de entrada WSGI para hostings cPanel/Passenger con Python."""

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "backend"))

from app import app as application  # noqa: E402
