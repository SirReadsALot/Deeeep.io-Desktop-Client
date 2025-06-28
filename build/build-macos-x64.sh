#!/usr/bin/env bash

# Build executable
CGO_ENABLED=1 GOOS=darwin GOARCH=amd64 go build -o ddc_amd64