#!/bin/bash
# Regenera todo desde el HTML original: python3 convert.py -> normalize.js (editor real) -> topatterns.py
# Uso: _build/build.sh ruta/al/web_colegio.html http://127.0.0.1:8080 usuario clave
set -e
cd "$(dirname "$0")"
python3 convert.py "$1"
node normalize.js "$2" "$3" "$4" | grep -E "problemas: [1-9]|TOTAL|^   -" | grep -v "^   - core/paragraph ATRIBUTO CAMBIÓ: content" || true
python3 topatterns.py
