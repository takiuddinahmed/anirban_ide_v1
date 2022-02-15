// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, clipboard } = require("electron");
const path = require("path");
const url = require("url");
const checkRequirements = require("./arduino/checkRequirements").module;
const getPortList = require("./arduino/portList").module;
const { codeUpload, cancelArduinoProcess } =
  require("./arduino/codeUpload").module;

console.log = () => {};

let mainWindow;

const startUrl = url.format({
  pathname: path.join(__dirname, "renderer/index.html"),
  protocol: "file:",
  slashes: true,
});

ipcMain.on("code-upload", async (event, data) => {
  console.log("code upload");
  // console.log({ data });
  event.reply("update_upload_info", { msg: "Start Processing" });

  const reply = (msg) => {
    event.reply("update_upload_info", msg);
  };

  await codeUpload(data.arduinoCode, "", data?.selectedPort?.path, reply);
});

ipcMain.on("cancel-upload", async () => {
  console.log("cancel upload");
  cancelArduinoProcess();
});

ipcMain.on("copy_code", async (event, code) => {
  console.log({ code });
  clipboard.writeText(code);
  event.reply("copy_code", "সম্পন্ন হয়েছে!!!");
});

// services
setInterval(async () => {
  const ports = await getPortList();
  // const ports = [];
  // console.log({ ports });
  mainWindow.webContents.send("get_available_serial_ports", ports);
}, 5000);
checkRequirements();

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    resizable: true,
    width: 1300,
    height: 800,
    minHeight: 800,
    minWidth: 1300,
    icon: path.join(__dirname, "assets/logo.png"),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadURL("http://localhost:3000");
  mainWindow.loadURL(startUrl);

  mainWindow.setMenu(null);

  mainWindow.once("ready-to-show", mainWindow.show);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  console.log({ mainWindow });

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
