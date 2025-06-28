#!/usr/bin/env bash

# Create universal executable
lipo -create -output ddc ddc_amd64 ddc_arm64

# Create .app
name="Deeeep.io Desktop Client"
if [ -a "$name.app" ]; then
    rm -rf "$name.app"
fi
mkdir "$name.app"
mkdir "$name.app/Contents"
mkdir "$name.app/Contents/MacOS"
mkdir "$name.app/Contents/Resources"

# Copy main executable
cp ddc "$name.app/Contents/MacOS/$name"

# Copy plugins
cp -r plugins "$name.app/Contents/MacOS/plugins"

cp -r "$name.app/Contents/MacOS/screenshots"

# Create info.plist
echo "<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>CFBundleDisplayName</key>
    <string>$name</string>
    <key>CFBundleExecutable</key>
    <string>$name</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon.icns</string>
    <key>CFBundleIdentifier</key>
    <string>com.sral.ddc</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>$name</string>
  </dict>
</plist>" > "$name.app/Contents/info.plist"

# Create app icon
cp build/icon.icns "$name.app/Contents/Resources/AppIcon.icns"

# Sign with empty certificate
codesign --force --deep -s - "$name.app"

# Zip
zip -rq "Deeeep.io-Desktop-Client-MacOS.zip" "$name.app" -x "*.DS_Store"
