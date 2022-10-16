@echo off
go build -ldflags -H=windowsgui -o main.exe
cd installer
go build -ldflags -H=windowsgui -o installer.exe
cd ../