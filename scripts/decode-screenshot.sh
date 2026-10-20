#!/usr/bin/env bash
# decode-screenshot.sh — take a get_screenshot JSON response on stdin,
# extract the base64 PNG, write it to $1 (output png path).
set -e
OUT="$1"
python - "$OUT" <<'EOF'
import sys, json, re, base64

raw = sys.stdin.read()
# response is SSE: lines starting with "data: "
data = None
for line in raw.splitlines():
    if line.startswith("data: "):
        data = line[6:]
        break
if data is None:
    sys.stderr.write("no data line found\n")
    sys.exit(1)

obj = json.loads(data)
content = obj["result"]["content"]
for item in content:
    if item.get("type") == "image":
        with open(sys.argv[1], "wb") as f:
            f.write(base64.b64decode(item["data"]))
        sys.stderr.write(f"wrote {sys.argv[1]}\n")
        sys.exit(0)
# no image found — dump text
for item in content:
    if item.get("type") == "text":
        sys.stderr.write(item["text"] + "\n")
sys.exit(1)
EOF
