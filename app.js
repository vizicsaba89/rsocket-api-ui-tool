const { app, BrowserWindow } = require('electron')
const url = require("url")
const path = require("path")

let appWindow

function initWindow() {
  appWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    },
  })

  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/spring-rsocket-client/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  appWindow.on('closed', function () {
    appWindow = null
  })
}

app.on('ready', initWindow)

app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (appWindow === null) {
    initWindow()
  }
})