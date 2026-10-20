#!/usr/bin/env bash
# figma-mcp.sh — talk to the Figma desktop Dev Mode MCP server (port 3845).
# Usage: figma-mcp.sh <tool> <node-id-with-dashes>
# Writes JSON result to stdout. Screenshots: use decode-screenshot.sh
set -e

TOOL="$1"
NODE="${2:-}"

PARAMS='{}'
if [ -n "$NODE" ]; then
  PARAMS="{\"nodeId\":\"$NODE\",\"clientLanguages\":\"typescript,html,css\",\"clientFrameworks\":\"react,tailwind\"}"
fi

BASE=http://127.0.0.1:3845/mcp
HDR1="Content-Type: application/json"
HDR2="Accept: application/json, text/event-stream"

SID=$(curl -si --max-time 15 -X POST $BASE -H "$HDR1" -H "$HDR2" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"claude","version":"1.0"}}}' \
  | grep -i "mcp-session-id" | tr -d "\r" | awk '{print $2}')

if [ -z "$SID" ]; then
  echo "ERROR: could not initialize MCP session" >&2
  exit 1
fi

curl -s --max-time 5 -X POST $BASE -H "$HDR1" -H "$HDR2" -H "Mcp-Session-Id: $SID" \
  -d '{"jsonrpc":"2.0","method":"notifications/initialized"}' > /dev/null

curl -s --max-time 300 -X POST $BASE -H "$HDR1" -H "$HDR2" -H "Mcp-Session-Id: $SID" \
  -d "{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"tools/call\",\"params\":{\"name\":\"$TOOL\",\"arguments\":$PARAMS}}"
