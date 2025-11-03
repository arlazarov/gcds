#!/bin/bash

echo "[WATCH] Starting SCSS watcher..."

sass --style=compressed --watch Styles/main.scss:wwwroot/css/main.css &
sass_pid=$!

cleanup() {
  echo "[EXIT] Stopping watcher..."
  kill $sass_pid 2>/dev/null
  exit 0
}
trap cleanup SIGINT SIGTERM

fswatch -o Styles | while read; do
  timestamp=$(date +%s)
  perl -pi -e "s|href=\"css/main\.css(\?v=\d+)?\"|href=\"css/main.css?v=${timestamp}\"|g" wwwroot/index.html
  echo "[BUILD] CSS rebuilt and version updated: ${timestamp}"
done
