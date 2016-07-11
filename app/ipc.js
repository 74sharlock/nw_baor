export default function ({mainWindow}) {
    const wc = mainWindow.webContents;

    this.on('toggleDevTools', function () {
        wc.isDevToolsOpened() ? wc.closeDevTools() : wc.openDevTools()
    });

    this.on('maximize', function () {
        mainWindow.maximize();
    });

    this.on('minimize', function () {
        mainWindow.minimize();
    });

    this.on('close', function () {
        mainWindow.close();
    })
}