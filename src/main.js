const { BrowserWindow, Menu, shell, Notification, app, ipcMain } = require("electron")
const RPC = require("discord-rpc")

function createWindow() {
  var win = new BrowserWindow({
    width: 1120,
    height: 712,
    icon: "./build/icon.ico",
    centre: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL("https:/deeeep.io/");
  win.removeMenu();

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
      label: "Extensions",
      click() {
        loadExtensionStore();
      },
    },
    {
      label: "Report a Bug",
      click() {
        shell.openExternal(
          "https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/issues"
        );
      },
    },
  ]);
  Menu.setApplicationMenu(menu);
  win.on("close", () => win.destroy());

  // ipcMain.on('AddSkin', (arg) => {
  //   win.webContents.executeJavaScript(`game.currentScene.myAnimal.setSkin(${arg})`)
  //   console.log("THE WEBCONTENTS HAS BEEN INJECTED TROLL")
  // })
}

function loadSettings() {
  console.log("tol");
}

function loadExtensionStore() {
  console.log("TROLLLED LMAO");
}

function loadAssetSwapper(win) {
  const asset = new BrowserWindow({
    title: "D.D.C Asset-Swapper",
    width: 700,
    height: 600,
    icon: "./build/icon.ico",
    centre: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  asset.loadURL(`file://${__dirname}/../public/assetSwapper.html`);
  asset.setMenu(null);
  asset.on("close", () => asset.destroy());

  ipcMain.on('setSkin', (e, inputValue) => {
      win.webContents.executeJavaScript(`
      game.currentScene.myAnimal.setSkin(${inputValue})
      `)
  })
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
