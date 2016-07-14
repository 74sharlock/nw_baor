// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import ipc from './ipc'

let mainWindow

app.on('ready', () => {
  //1300*1120

  if (process.env.NODE_ENV !== 'production') {
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      frame: false
    });
    mainWindow.openDevTools()
  } else {
    mainWindow = new BrowserWindow({
      width: 1300,
      height: 1120,
      frame: false
    })
  }

  ipc.call(ipcMain, {app, mainWindow});

  // Load the HTML file directly from the webpack dev server if
  // hot reload is enabled, otherwise load the local file.
  const mainURL = process.env.HOT
      ? `http://localhost:${process.env.PORT}/`
      : 'file://' + path.join(__dirname, 'index.html')

  mainWindow.loadURL(mainURL)



  mainWindow.on('closed', () => {
    mainWindow = null
  });

});

app.on('window-all-closed', () => {
  app.quit()
});
