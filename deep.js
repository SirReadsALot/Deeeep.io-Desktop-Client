function createWindow() {
  const { BrowserWindow } = require('electron')
  var win = new BrowserWindow ({
    width: 1120,
    height: 712,
    icon: 'assets/icons/win/icon.png',
    centre: true
  })
  // const { session } = require('electron')
  // session.loadExtension('C:\Users\login-user\AppData\Local\Google\Chrome\User Data\Default\Extensions\cmlbeiacmcbdiepcenjmhmkclmffbgbd')
  win.loadURL('https:/deeeep.io/')
  win.removeMenu()
  // win.webContents.executeJavaScript(``);
  win.on('close', function () {
    win.destroy()
  });
}

var splashIntro = () => {
  const { BrowserWindow } = require('electron');
   var splashWindow = new BrowserWindow({
     width: 1130,
     height: 760,
     icon: './assets/icon.png',
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
  splashIntro()
  // createWindow()
})


const { autoUpdater } = require("electron-updater");
const server = "https://deeeep-io-desktop-app.vercel.app/";
const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
autoUpdater.setFeedURL(feed);

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
