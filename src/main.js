const { BrowserWindow, Menu, shell, Notification, app, ipcMain, session } = require("electron")
const RPC = require("discord-rpc");

function createWindow() {
  var win = new BrowserWindow({
    width: 1120,
    height: 712,
    icon: "./build/icon.ico",
    center: true,
     webPreferences: {
      nodeIntegration: true
    },
  });
  win.loadURL("https:/deeeep.io/");
  win.removeMenu();
  win.webContents.openDevTools()

  const menu = Menu.buildFromTemplate([
    {
      label: "Settings",
      click() {
        loadSettings();
      },
    },
    {
      label: "Asset-Swapper",
      click() {
        loadAssetSwapper(win);
      },
    },
    {
      label: "Enable Docassets",
      click() {
        loadDocassets(win)
      },
    },
    {
      label: "Report a Bug",
      click() {
        shell.openExternal("https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/issues" );
      },
    }
  ]);
  Menu.setApplicationMenu(menu);
  win.on("close", () => win.destroy());
}

function loadSettings() {
  const settings = new BrowserWindow({
    title: "D.D.C Settings",
    width: 700,
    height: 400,
    icon: "./build/icon.ico",
    center: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  settings.loadURL(`file://${__dirname}/../public/settings.html`);
  settings.setMenu(null);
  settings.on("close", () => settings.destroy());
}

function loadAssetSwapper(win) {
  const asset = new BrowserWindow({
    title: "D.D.C Asset-Swapper",
    width: 700,
    height: 600,
    icon: "./build/icon.ico",
    center: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  asset.loadURL(`file://${__dirname}/../public/assetSwapper.html`);
  asset.setMenu(null);
  asset.on("close", () => asset.destroy());
  ipcMain.on('setSkin', (e, skins) => {
      win.webContents.executeJavaScript(`
      var skins = ${JSON.stringify(skins)};
      if (window.interval != undefined) {
        clearInterval(window.interval);
      }
      window.interval = undefined;
        window.interval = setInterval(function(skins) {
          try {
            for (var i in skins) {
              if (game.currentScene.myAnimal.visibleFishLevel == i) {
                game.currentScene.myAnimal.setSkin(skins[i])
              }
            }
          }
          catch (err) {
            var e;
          }
        }, 1000, skins)
      `)
  })
}

function loadDocassets(win) {
  const os = require('os')
  win.webContents.session.loadExtension(`C:/Users/${os.userInfo().username}/AppData/Local/Google/Chrome/User Data/Default/Extensions/cmlbeiacmcbdiepcenjmhmkclmffbgbd/1.0.33_0`)
    .then(console.log("Docassets is loaded!"))
}

function showNotification() {
  const notification = {
    title: "D.D.C Alert",
    body: "The Deeeep.io Desktop Client has been launched!",
    icon: "./build/icon.ico",
  };
  new Notification(notification).show();
}

function splashIntro() {
  const splash = new BrowserWindow({
    width: 1130,
    height: 760,
    center: true,
    skipTaskbar: true,
    resizable: false,
    frame: false,
    transparent: true,
     webPreferences: {
       nodeIntegration: true,
    },
  });
  splash.loadURL(`file://${__dirname}/../public/splashIntro.html`);
  splash.removeMenu();
  splash.setMenu(null);
  splash.webContents.once("did-finish-load", () =>
    setTimeout(() => {
      createWindow();
      setTimeout(() => {
        splash.destroy();
      }, 2000);
    }, 2000)
  );
}

app.userAgentFallback = "Chrome";
app.once("ready", () => {
  splashIntro(), showNotification();
});

const rpc = new RPC.Client({
  transport: "ipc",
});

rpc.on("ready", () => {
  rpc.setActivity({
    details: "Playing Deeeep.io",
    largeImageKey: "deeplarge",
    largeImageText: "Deeeep.io",
    startTimestamp: new Date(),
  });
});

rpc.login({
  clientId: "817817065862725682",
});

// const { TFFA, FFA, PD, OneVOne, V1, TA } = document.getElementsByClassName(".name")[0];

// if (TFFA.value = "Team FFA") {
//   console.log(`You are on ${TFFA.value}`)
// } 
// if (FFA.value = "Free For All") {
//   console.log(`You are on ${FFA.value}`)
// }
// if (PD.value = "Pearl Defence") {
//   console.log(`You are on ${PD.value}`)
// }
// if (OneVOne.value = "1vs1") {
//   console.log(`You are on ${OneVOne.value}`)
// }
// if (V1.value = "First version(v1)") {
//   console.log(`You are on ${V1.value}`)
// }
// if (TA.value = "Toxic Algae (Beta)") {
//   console.log(`You are on ${TA.value}`)
// }
