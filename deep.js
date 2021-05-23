function createWindow() {
  const { BrowserWindow, Menu } = require('electron')
  const ipcRenderer = require('electron').ipcRenderer
  const { shell } = require('electron')
  var win = new BrowserWindow ({
    width: 1120,
    height: 712,
    icon: 'build/icon.ico',
    centre: true
  })
  win.loadURL('https:/deeeep.io/')
  win.removeMenu()
  // 6270 GGEZ skin
  // win.webContents.openDevTools()
  // ipcRenderer.on("add-skins", () => {
  //   win.webContents.executeJavaScript(`
  //     const skinStuff={"level":AnimalID, "id":inputValue};
          
  //     function skin(fishLevel,skinId){
  //     const shortened=game.currentScene.myAnimal;
  //     try{
  //       const test=true;
  //         if(shortened.skin) {
  //           if(shortened.skin.id==skinId)	{
  //             test=false
  //           }
  //       }
  //       if(shortened.visibleFishLevel==fishLevel&&test) {
  //         game.currentScene.myAnimal.setSkin(skinId)
  //       }
  //         }catch(e){
  //       }
  //   }
  //   setInterval(skin,1000,skinStuff.level,skinStuff.id)
  // `)})
  var menu = Menu.buildFromTemplate([
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

function loadExtensionStore() {
  console.log("TROLLLED LMAO")
}
function loadAssetSwapper() {
  const ipc = require('electron').ipcMain
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
  // ipc.send("add-skin", document.getElementsByClassName("skin-input")[0].value)
}
Menu.setApplicationMenu(menu); 
  win.on('close', function () {
    win.destroy()
  })
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
  splashIntro()
  // createWindow()
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
  clientId: ''
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
//     clientId: ''
//   })
// }
