const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let isQuiting = false
let tray = null
let window = null

const createWindow = () => {
  // Add icon to the system notification area
  tray = new Tray(path.join(__dirname, 'icon.png'))
  tray.setToolTip('Holomeeting Companion')

  // Add context menu to the icon
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Show App',
        click: function () {
          window.show()
        },
      },
      {
        label: 'Quit',
        click: function () {
          isQuiting = true
          app.quit()
        },
      },
    ])
  )

  // Create the browser window.
  window = new BrowserWindow({
    width: 475,
    height: 215,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: false,
    frame: true,
    backgroundColor: '#2B2B2B',
  })

  // and load the index.html of the app.
  window.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  )

  window.on('close', function (event) {
    if (!isQuiting) {
      event.preventDefault()
      window.hide()
      event.returnValue = false
    }
  })

  // Open the DevTools.
  window.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (isQuiting) {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('before-quit', function () {
  isQuiting = true
})
