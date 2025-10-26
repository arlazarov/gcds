#!/bin/bash

echo "Watching SCSS files..."

find Styles -name "*.scss" | \
entr -r bash -c '
  sass Styles/main.scss wwwroot/css/main.css

  timestamp=$(date +%s)
  target="wwwroot/index.html"

  sed -i "" "s|main\.css?v=[0-9a-zA-Z]*|main.css?v=${timestamp}|" "$target"
  echo "[BUILD] Compiled SCSS..."
'
