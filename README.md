[![forthebadge](https://forthebadge.com/images/badges/made-with-go.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com) [![discord](https://img.shields.io/discord/841929038620786689?label=DISCORD%20SERVER&style=for-the-badge)](https://discord.gg/BMHVrKYeem)

[![Github All Releases](https://img.shields.io/github/downloads/SirReadsALot/Deeeep.io-Desktop-Client/total.svg)]()


# Deeeep.io Desktop Client

<img src="./assets/golang_logo.png">

> **NOTE**: the [electron edition](https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/tree/electron) was the default version before we switched to golang because of some drawbacks of electron.

Welcome to the official repository of the Deeeep.io Desktop Client!

The Deeeep.io Desktop Client is a free and open source desktop app made with go for the hit io game called Deeeep.io.

## Supported Platforms

| Version | Platform | Availability| 
| ------- | -------- | ----------- |
| v2.0  | Windows  | Published | 
| v2.0    | MacOS    | Published |
| v2.0    | Linux | Published |

- [x] Windows 64-bit version
- [x] Windows 32-bit version
- [x] Mac universal version
- [x] Linux amd64 version
- [x] Linux 386 version

## Installing

### Windows

To install:
```ps
iwr -useb https://raw.githubusercontent.com/SirReadsALot/Deeeep.io-Desktop-Client/golang/installers/install-windows.ps1 | iex
```

To uninstall:
```ps
iwr -useb https://raw.githubusercontent.com/SirReadsALot/Deeeep.io-Desktop-Client/golang/installers/uninstall-windows.ps1 | iex
```

## Running from source code

This application requires [go](https://go.dev/) to be installed.

To download this repository:

> This step requires Git to be installed
```
git clone https://github.com/SirReadsALot/Deeeep.io-Desktop-Client.git
cd Deeeep.io-Desktop-Client
```

Run the app using:
```
go run main.go
```
or by doing
```
./go_run.exe
```

Build the app using:
```
go build -o dist/Deeeep.io-Desktop-Client.exe
```
or by doing:
```
./go_build.exe
```


## General Info

Join our [Discord server](https://discord.gg/BMHVrKYeem) or check out our [website](https://sirreadsalot.github.io/sralcodeproj/).

> *This repository will not receive any major updates other than fixes*

## License

The Deeeep.io Desktop Client is licensed under the MIT license.
