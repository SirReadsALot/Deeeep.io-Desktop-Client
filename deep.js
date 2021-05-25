function createWindow() {
  const { BrowserWindow, Menu, ipcRenderer } = require('electron')
  const { shell } = require('electron')
  var win = new BrowserWindow ({
    width: 1120,
    height: 712,
    icon: 'build/icon.ico',
    centre: true
  })
  // const { session } = require('electron')
  // session.loadExtension('C:\Users\login-user\AppData\Local\Google\Chrome\User Data\Default\Extensions\cmlbeiacmcbdiepcenjmhmkclmffbgbd')
  win.loadURL('https:/deeeep.io/')
  win.removeMenu()
  // ipcRenderer.on('AddSkin', () => {
  //       win.webContents.executeJavaScript( AddSkin() )
  // }
  var menu = Menu.buildFromTemplate([
    {
      label:'Settings',
      click() {
        loadSettings()
      }
    },
    {
        label: 'Asset-Swapper',
        click() {
        loadAssetSwapper()
        }
    },
    {
        label: 'Extension Store',
        click() {
          loadExtensionStore()
        }
    },
    {
        label: "Report a Bug",
        click() {
          shell.openExternal('https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/issues')
        }
    }
])

function loadSettings() {
  console.log("tol")
}
function loadExtensionStore() {
  console.log("TROLLLED LMAO")
}
function loadAssetSwapper() {
  const { BrowserWindow } = require('electron');
  var assetSwapper = new BrowserWindow({
    title: "D.D.C Asset-Swapper",
    width: 700,
    height: 600,
    icon: 'build/icon.ico',
    centre: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  assetSwapper.loadURL(`file://${__dirname}/assetswapper.html`)
  assetSwapper.setMenu(null)
  assetSwapper.webContents.send('AddSkin')
}
Menu.setApplicationMenu(menu); 
  win.on('close', function () {
    win.destroy()
  })
}

const { Notification } = require('electron')
function showNotification() {
  const notification = {
    title: "D.D.C Alert",
    body: "The Deeeep.io Desktop Client has been launched!",
    icon: "./build/icon.ico"
  }
  new Notification(notification).show()
}

var splashIntro = () => {
  const { BrowserWindow } = require('electron');
   var splashWindow = new BrowserWindow({
     width: 1130,
     height: 760,
     center: true,
     skipTaskbar: true,
     resizable: false,
     frame: false,
     transparent: true,
     webPreferences: {
       nodeIntegration: true
     }
   })
   splashWindow.loadURL(`file://${__dirname}/splashIntro.html`)
   splashWindow.removeMenu()
   splashWindow.setMenu(null);
   splashWindow.webContents.once("did-finish-load", () => setTimeout(() => {
     createWindow()
     setTimeout(() => {
       splashWindow.destroy()
     }, 2000);
   }, 2000));
}

const { app } = require('electron')
app.userAgentFallback = "Chrome";
app.once('ready', function () {
  splashIntro(),
  showNotification()
})

const RPC = require('discord-rpc');
const rpc = new RPC.Client({
  transport:"ipc"
})

rpc.on('ready', () => {
  rpc.setActivity({
    details: "Playing Deeeep.io",
    largeImageKey: "deeplarge",
    largeImageText: "Deeeep.io",
    startTimestamp: new Date()

  })
})

rpc.login({
  clientId: '817817065862725682'
})
import { NsisUpdater } from "electron-updater"
// Or MacUpdater

export default class AppUpdater {
    constructor() {
        const options = {
            requestHeaders: {
                // Any request headers to include here
                Authorization: 'Basic AUTH_CREDS_VALUE'
            },
            provider: 'GitHub',
            url: 'https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/tree/downloads'
        }

        const autoUpdater = new NsisUpdater(options)
        autoUpdater.checkForUpdatesAndNotify()
    }
}

if (process.platform === "win32") {
  autoUpdater = new NsisUpdater(options)
}
else if (process.platform === "darwin") {
  autoUpdater = new MacUpdater(options)
}

// const gameMode = document.getElementsByClassName('.name')[1];
// if (gameMode.value) {
//   const RPC = require('discord-rpc');
//   const rpc = new RPC.Client({
//     transport: "ipc"
//   })

//   rpc.on('ready', () => {
//     rpc.setActivity({
//       details: "Playing Deeeep.io",
//       largeImageKey: "deeplarge",
//       largeImageText: "Deeeep.io",
//       startTimestamp: new Date()

//     })
//   })

//   rpc.login({
//     clientId: '817817065862725682'
//   })
// }
