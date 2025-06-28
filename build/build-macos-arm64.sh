#!/usr/bin/env bash

# Build executable
CGO_ENABLED=1 GOOS=darwin GOARCH=arm64 go build -o ddc_arm64