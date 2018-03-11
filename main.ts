import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { Handler } from './bus/handler';
import { initTemporaryPath } from './paths';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
if (serve) {
  require('electron-reload')(__dirname, {
    ignored: /node_modules|temp|[\/\\]\./,
  });
}

function createWindow() {
  win = new BrowserWindow({
    center: true,
    height: 450,
    resizable: false,
    width: 720,
    x: 0,
    y: 0,
    titleBarStyle: 'default',
  });

  win.webContents.on('will-navigate', event => {
    event.preventDefault()
  });

  win.loadURL(url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, '/index.html'),
    slashes: true
  }));

  if (serve) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

  Handler.getInstance().init(ipcMain);
  initTemporaryPath();
}

try {
  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

  app.on('open-file', () => {
    event.preventDefault();
  });
} catch (e) {
  // Catch Error
  // throw e;
}
