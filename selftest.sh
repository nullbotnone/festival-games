#!/bin/sh
# Interaction self-check. Builds a throwaway page from index.html, swaps in the
# assertions, and renders it in headless Chrome. No framework, no runner.
#   ./selftest.sh
set -e
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT=4179
trap 'rm -f _selftest.html; kill $SRV 2>/dev/null' EXIT

sed 's#<script src="app.js"></script>#<script>try { localStorage.clear(); } catch (e) {}</script><script src="app.js"></script><script src="selftest.js"></script>#' \
  index.html > _selftest.html

python3 -m http.server "$PORT" >/dev/null 2>&1 &
SRV=$!
sleep 1

"$CHROME" --headless --disable-gpu --no-sandbox --virtual-time-budget=5000 \
  --dump-dom "http://127.0.0.1:$PORT/_selftest.html" 2>/dev/null \
  | grep -o '<title>[^<]*' | sed 's#<title>##' | tr '|' '\n' | sed 's/^ *//'
