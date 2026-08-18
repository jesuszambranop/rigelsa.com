$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot
if (-not (Test-Path -LiteralPath ".venv\Scripts\python.exe")) {
  py -m venv .venv
}
& ".venv\Scripts\python.exe" -m pip install -r "backend\requirements.txt"
& ".venv\Scripts\python.exe" "backend\app.py"
