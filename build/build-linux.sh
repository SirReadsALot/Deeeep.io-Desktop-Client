#!/bin/bash

# Build
if [ -a "dist" ]; then
    rm -rf "dist"
fi
CGO_ENABLED=0 go build -o dist/Deeeep.io-Desktop-Client
cp -r plugins dist/plugins
cp -r screenshots dist/screenshots

# Zip
tar -zcf Deeeep.io-Desktop-Client-Linux.tar.gz dist
