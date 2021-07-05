// const { BrowserWindow, Menu, shell, Notification, app, ipcMain, session } = require("electron")
// const RPC = require("discord-rpc");

// function createWindow() {
//   var win = new BrowserWindow({
//     width: 1120,
//     height: 712,
//     icon: "./build/icon.ico",
//     center: true,
//      webPreferences: {
//       nodeIntegration: true
//     },
//   });
//   win.loadURL("https:/deeeep.io/");
//   win.removeMenu();
//   // win.webContents.openDevTools()

//   const menu = Menu.buildFromTemplate([
//     {
//       label: "Settings",
//       click() {
//         loadSettings();
//       },
//     },
//     {
//       label: "Asset-Swapper",
//       click() {
//         loadAssetSwapper(win);
//       },
//     },
//     {
//       label: "Enable Docassets",
//       click() {
//         loadDocassets(win)
//       },
//     },
//     {
//       label: "Report a Bug",
//       click() {
//         shell.openExternal("https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/issues" );
//       },
//     }
//   ]);
//   Menu.setApplicationMenu(menu);
//   win.on("close", () => win.destroy());
// }

// function loadSettings() {
//   const settings = new BrowserWindow({
//     title: "D.D.C Settings",
//     width: 700,
//     height: 400,
//     icon: "./build/icon.ico",
//     center: true,
//     resizable: false,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   });
//   settings.loadURL(`file://${__dirname}/../public/settings.html`);
//   settings.setMenu(null);
//   settings.on("close", () => settings.destroy());
// }

// function loadAssetSwapper(win) {
//   const asset = new BrowserWindow({
//     title: "D.D.C Asset-Swapper",
//     width: 700,
//     height: 600,
//     icon: "./build/icon.ico",
//     center: true,
//     resizable: false,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   });
//   asset.loadURL(`file://${__dirname}/../public/assetSwapper.html`);
//   asset.setMenu(null);
//   asset.on("close", () => asset.destroy());
//   ipcMain.on('setSkin', (e, inputValue) => {
//       win.webContents.executeJavaScript(`
//       game.currentScene.myAnimal.setSkin(${inputValue})
//       `)
//   })
// }

// function loadDocassets(win) {
//   const os = require('os')
//   win.webContents.session.loadExtension(`C:/Users/${os.userInfo().username}/AppData/Local/Google/Chrome/User Data/Default/Extensions/cmlbeiacmcbdiepcenjmhmkclmffbgbd/1.0.33_0`)
//     .then(console.log("Docassets is loaded!"))
// }

// function showNotification() {
//   const notification = {
//     title: "D.D.C Alert",
//     body: "The Deeeep.io Desktop Client has been launched!",
//     icon: "./build/icon.ico",
//   };
//   new Notification(notification).show();
// }

// function splashIntro() {
//   const splash = new BrowserWindow({
//     width: 1220, // original: 1130
//     height: 820, // original: 760
//     /* width: 824,
//     height: 565, //this is for the other png */
//     icon: "./build/icon.ico",
//     center: true,
//     skipTaskbar: false,
//     resizable: false,
//     frame: false,
//     transparent: true,
//      webPreferences: {
//        nodeIntegration: true,
//     },
//   });
//   splash.loadURL(`file://${__dirname}/../public/splashIntro.html`);
//   splash.removeMenu();
//   splash.setMenu(null);
//   splash.webContents.once("did-finish-load", () =>
//     setTimeout(() => {
//       createWindow();
//       setTimeout(() => {
//         splash.destroy();
//       }, 7000); // original timing for both: 2000
//     }, 7000)
//   );

// // const options = {
// //   provider: 'github',
// //   url: 'https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/releases/latest'
// // }
// // const autoUpdater = new NsisUpdater(options)
// }

// app.userAgentFallback = "Chrome";
// app.once("ready", () => {
//   splashIntro(), showNotification();
// });

// const rpc = new RPC.Client({
//   transport: "ipc",
// });
// rpc.on("ready", () => {
//   rpc.setActivity({
//     details: "Playing Deeeep.io",
//     largeImageKey: "deeplarge_2",
//     largeImageText: "Deeeep.io",
//     startTimestamp: new Date(),
//   });
//   rpc.login({
//     clientId: "817817065862725682"
//   });
// })

// //   const RPCInject = document.getElementsByClassname('gamemode-button')[0].childNodes[0];

// //   if (RPCInject.value = "Team FFA") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "tffa",
// //       largeImageText: "Deeeep.io | Team FFA",
// //       startTimestamp: new Date(),
// //    });
// //   } 
// //   if (RPCInject.value = "Free For All") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "ffa",
// //       largeImageText: "Deeeep.io | Free For All",
// //       startTimestamp: new Date(),
// //    });
// //   }
// //   if (RPCInject.value = "Pearl Defence") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "pd",
// //       largeImageText: "Deeeep.io | Pearl Defence",
// //       startTimestamp: new Date(),
// //    });
// //   }
// //   if (RPCInject.value = "1vs1") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "deeplarge",
// //       largeImageText: "Deeeep.io | Unknown",
// //       startTimestamp: new Date(),
// //    });
// //   }
// //   if (RPCInject.value = "First version(v1)") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "v1",
// //       largeImageText: "Deeeep.io | Version 1",
// //       startTimestamp: new Date(),
// //    });
// //   }
// //   if (RPCInject.value = "Toxic Algae (Beta)") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "toxicalgae",
// //       largeImageText: "Deeeep.io | Toxic Algae",
// //       startTimestamp: new Date(),
// //    });
// //   }
// // })
// // const { TFFA, FFA, PD, OneVOne, V1, TA } = document.body.getElementsByClassName(".name")[0];

// // if (TFFA.value = "Team FFA") {
// //   console.log(`You are on ${TFFA.value}`)
  
// // } 
// // if (FFA.value = "Free For All") {
// //   console.log(`You are on ${FFA.value}`)
// // }
// // if (PD.value = "Pearl Defence") {
// //   console.log(`You are on ${PD.value}`)
// // }
// // if (OneVOne.value = "1vs1") {
// //   console.log(`You are on ${OneVOne.value}`)
// // }
// // if (V1.value = "First version(v1)") {
// //   console.log(`You are on ${V1.value}`)
// // }
// // if (TA.value = "Toxic Algae (Beta)") {
// //   console.log(`You are on ${TA.value}`)
// // 

// const { BrowserWindow, Menu, shell, Notification, app, ipcMain, session } = require("electron")
// const RPC = require("discord-rpc");

// function createWindow() {
//   var win = new BrowserWindow({
//     width: 1120,
//     height: 712,
//     icon: "./build/icon.ico",
//     center: true,
//      webPreferences: {
//       nodeIntegration: true
//     },
//   });
//   win.loadURL("https:/deeeep.io/");
//   win.removeMenu();
//   // win.webContents.openDevTools()

//   const menu = Menu.buildFromTemplate([
//     {
//       label: "Settings",
//       click() {
//         loadSettings();
//       },
//     },
//     {
//       label: "Asset-Swapper",
//       click() {
//         loadAssetSwapper(win);
//       },
//     },
//     {
//       label: "Enable Docassets",
//       click() {
//         loadDocassets(win)
//       },
//     },
//     {
//       label: "Report a Bug",
//       click() {
//         shell.openExternal("https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/issues" );
//       },
//     }
//   ]);
//   Menu.setApplicationMenu(menu);
//   win.on("close", () => win.destroy());
// }

// function loadSettings() {
//   const settings = new BrowserWindow({
//     title: "D.D.C Settings",
//     width: 700,
//     height: 400,
//     icon: "./build/icon.ico",
//     center: true,
//     resizable: false,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   });
//   settings.loadURL(`file://${__dirname}/../public/settings.html`);
//   settings.setMenu(null);
//   settings.on("close", () => settings.destroy());
// }

// function loadAssetSwapper(win) {
//   const asset = new BrowserWindow({
//     title: "D.D.C Asset-Swapper",
//     width: 700,
//     height: 600,
//     icon: "./build/icon.ico",
//     center: true,
//     resizable: false,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   });
//   asset.loadURL(`file://${__dirname}/../public/assetSwapper.html`);
//   asset.setMenu(null);
//   asset.on("close", () => asset.destroy());
//   ipcMain.on('setSkin', (e, inputValue) => {
//       win.webContents.executeJavaScript(`
//       game.currentScene.myAnimal.setSkin(${inputValue})
//       `)
//   })
// }

// function loadDocassets(win) {
//   const os = require('os')
//   win.webContents.session.loadExtension(`C:/Users/${os.userInfo().username}/AppData/Local/Google/Chrome/User Data/Default/Extensions/cmlbeiacmcbdiepcenjmhmkclmffbgbd/1.0.33_0`)
//     .then(console.log("Docassets is loaded!"))
// }

// function showNotification() {
//   const notification = {
//     title: "D.D.C Alert",
//     body: "The Deeeep.io Desktop Client has been launched!",
//     icon: "./build/icon.ico",
//   };
//   new Notification(notification).show();
// }

// function splashIntro() {
//   const splash = new BrowserWindow({
//     width: 1220, // original: 1130
//     height: 820, // original: 760
//     /* width: 824,
//     height: 565, //this is for the other png */
//     icon: "./build/icon.ico",
//     center: true,
//     skipTaskbar: false,
//     resizable: false,
//     frame: false,
//     transparent: true,
//      webPreferences: {
//        nodeIntegration: true,
//     },
//   });
//   splash.loadURL(`file://${__dirname}/../public/splashIntro.html`);
//   splash.removeMenu();
//   splash.setMenu(null);
//   splash.webContents.once("did-finish-load", () =>
//     setTimeout(() => {
//       createWindow();
//       setTimeout(() => {
//         splash.destroy();
//       }, 7000); // original timing for both: 2000
//     }, 7000)
//   );

// // const options = {
// //   provider: 'github',
// //   url: 'https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/releases/latest'
// // }
// // const autoUpdater = new NsisUpdater(options)
// }

// app.userAgentFallback = "Chrome";
// app.once("ready", () => {
//   splashIntro(), showNotification();
// });

// const rpc = new RPC.Client({
//   transport: "ipc",
// });
// rpc.on("ready", () => {
//   rpc.setActivity({
//     details: "Playing Deeeep.io",
//     largeImageKey: "deeplarge_2",
//     largeImageText: "Deeeep.io",
//     startTimestamp: new Date(),
//   });
//   rpc.login({
//     clientId: "817817065862725682"
//   });
// })

// //   const RPCInject = document.getElementsByClassname('gamemode-button')[0].childNodes[0];

// //   if (RPCInject.value = "Team FFA") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "tffa",
// //       largeImageText: "Deeeep.io | Team FFA",
// //       startTimestamp: new Date(),
// //    });
// //   } 
// //   if (RPCInject.value = "Free For All") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "ffa",
// //       largeImageText: "Deeeep.io | Free For All",
// //       startTimestamp: new Date(),
// //    });
// //   }
// //   if (RPCInject.value = "Pearl Defence") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "pd",
// //       largeImageText: "Deeeep.io | Pearl Defence",
// //       startTimestamp: new Date(),
// //    });
// //   }
// //   if (RPCInject.value = "1vs1") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "deeplarge",
// //       largeImageText: "Deeeep.io | Unknown",
// //       startTimestamp: new Date(),
// //    });
// //   }
// //   if (RPCInject.value = "First version(v1)") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "v1",
// //       largeImageText: "Deeeep.io | Version 1",
// //       startTimestamp: new Date(),
// //    });
// //   }
// //   if (RPCInject.value = "Toxic Algae (Beta)") {
// //     console.log(`You are on ${RPCInject.value}`),
// //     rpc.setActivity({
// //       details: "Playing Deeeep.io",
// //       largeImageKey: "toxicalgae",
// //       largeImageText: "Deeeep.io | Toxic Algae",
// //       startTimestamp: new Date(),
// //    });
// //   }
// // })
// // const { TFFA, FFA, PD, OneVOne, V1, TA } = document.body.getElementsByClassName(".name")[0];

// // if (TFFA.value = "Team FFA") {
// //   console.log(`You are on ${TFFA.value}`)
  
// // } 
// // if (FFA.value = "Free For All") {
// //   console.log(`You are on ${FFA.value}`)
// // }
// // if (PD.value = "Pearl Defence") {
// //   console.log(`You are on ${PD.value}`)
// // }
// // if (OneVOne.value = "1vs1") {
// //   console.log(`You are on ${OneVOne.value}`)
// // }
// // if (V1.value = "First version(v1)") {
// //   console.log(`You are on ${V1.value}`)
// // }
// // if (TA.value = "Toxic Algae (Beta)") {
// //   console.log(`You are on ${TA.value}`)
// // 
