// import { NsisUpdater } from "electron-updater"
// Or MacUpdater

// export default class AppUpdater {
//     constructor() {
//         const options = {
//             requestHeaders: {
//                 // Any request headers to include here
//                 Authorization: 'Basic AUTH_CREDS_VALUE'
//             },
//             provider: 'GitHub',
//             url: 'https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/tree/downloads'
//         }

//         const autoUpdater = new NsisUpdater(options)
//         autoUpdater.checkForUpdatesAndNotify()
//     }
// }

// if (process.platform === "win32") {
//   autoUpdater = new NsisUpdater(options)
// }
// else if (process.platform === "darwin") {
//   autoUpdater = new MacUpdater(options)
// }

// const gameMode = document.getElementsByClassName('.name')[1];
// if (gameMode.value) {
//   const rpc = require('discord-rpc');
//   const rpc = new rpc.Client({
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

// const { session } = require('electron')
// session.loadExtension('C:\Users\login-user\AppData\Local\Google\Chrome\User Data\Default\Extensions\cmlbeiacmcbdiepcenjmhmkclmffbgbd')

// ipcRenderer.on('AddSkin', () => {
//       win.webContents.executeJavaScript( AddSkin() )
// }
