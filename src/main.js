const { BrowserWindow, app } = require("electron");
const path = require("path");
const url = require("url");

let win;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

let boot = () => {
    win = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            webSecurity: false
        }
    });
    win.setMenu(null);

    // win.loadURL(`file://${__dirname}/index.html`);
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            // protocol: 'file',
            slashes: true
        })
    );
    // if (config.isDev)
    // win.webContents.openDevTools();
    win.openDevTools({ detach: true });
};



app.on("ready", boot);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        boot();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.