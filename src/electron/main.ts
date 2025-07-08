import { app, BrowserWindow } from 'electron';
import path from 'path';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 720,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
    }
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
});