#!/bin/zsh
set -e
cd "$(dirname "$0")/html"
V=$(date +%Y.%m.%d-%H%M)

sed -i '' -E "s/\"version\": \"[^\"]*\"/\"version\": \"$V\"/" version.json
sed -i '' -E "s/^const VERSION = '[^']*';/const VERSION = '$V';/" sw.js
sed -i '' -E "s/^  const APP_VERSION = '[^']*';/  const APP_VERSION = '$V';/" assets/js/app.js
sed -i '' -E "s/(style\.css|app\.js)\?v=[^\"]*/\1?v=$V/g" index.html

echo "✓ Version $V gesetzt – jetzt den Inhalt von html/ hochladen."
