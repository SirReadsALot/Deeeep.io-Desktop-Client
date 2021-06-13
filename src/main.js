const {
  BrowserWindow,
  Menu,
  shell,
  Notification,
  app,
  ipcMain,
} = require("electron");
const { Client } = require("discord-rpc");
const { autoUpdater } = require("electron-updater")

function createWindow() {
  var win = new BrowserWindow({
    width: 1120,
    height: 712,
    icon: "./build/icon.ico",
    center: true,
    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`,
    },
  });
  win.openDevTools()
  win.loadURL("https:/deeeep.io/");
  win.removeMenu();

  const menu = Menu.buildFromTemplate([
    {
      label: "Settings",
      click: loadSettings
    },
    {
      label: "Asset-Swapper",
      click: loadAssetSwapper
    },
    {
      label: "Enable Docassets",
      click: loadDocassets
    },
    {
      label: "Report a Bug",
      click: () => shell.openExternal(
        "https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/issues"
      )
    },
  ]);
  Menu.setApplicationMenu(menu);
  ipcMain.on("gameMode", (_, value) => {
    console.log(value)
    rpc.setActivity({
      details: "Playing Deeeep.io",
      largeImageKey: "build/icon.ico",
      largeImageText: `Deeeep.io | ${value}`,
      startTimestamp: new Date(),
    });
  });
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
      contextIsolation: false,
    },
  });
  settings.loadURL(`file://${__dirname}/../public/settings.html`);
  settings.setMenu(null);
  settings.on("close", () => settings.destroy());
}

function loadAssetSwapper() {
  const asset = new BrowserWindow({
    title: "D.D.C Asset-Swapper",
    width: 700,
    height: 600,
    icon: "./build/icon.ico",
    center: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  asset.loadURL(`file://${__dirname}/../public/assetSwapper.html`);
  asset.setMenu(null);
  asset.on("close", () => asset.destroy());
  ipcMain.on("setSkin", (e, inputValue) => {
    win.webContents.executeJavaScript(`
      game.currentScene.myAnimal.setSkin(${inputValue})
      `);
  });
}

function loadDocassets() {
  const os = require("os");
  win.webContents.session
    .loadExtension(
      `C:/Users/${
        os.userInfo().username
      }/AppData/Local/Google/Chrome/User Data/Default/Extensions/cmlbeiacmcbdiepcenjmhmkclmffbgbd/1.0.33_0`
    )
    .then(alert("Docassets is loaded!"));
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
    width: 1130, // original: 1130
    height: 760, // original: 760
    /* width: 824,
    height: 565, //this is for the other png */
    center: true,
    skipTaskbar: false,
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
  autoUpdater.checkForUpdatesAndNotify()
    .then((res) => splash.destroy())
}

app.userAgentFallback = "Chrome";
app.once("ready", () => {
  createWindow();
  splashIntro();
  // showNotification();
});

var rpc = new Client({
  transport: "ipc",
});

rpc.login({
  clientId: "817817065862725682",
})

rpc.on("ready", () => {
  rpc.setActivity({
    details: "Playing Deeeep.io",
    largeImageKey: "build/icon.ico",
    largeImageText: "Deeeep.io",
    startTimestamp: new Date(),
  })
});