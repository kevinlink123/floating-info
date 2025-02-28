import { app, BrowserWindow, ipcMain} from "electron";
import path from 'path';
import { ipcMainHandle, isDev } from "./util.js";
import { getDate, getStaticData, getTime, pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";
import { MAINWINDOW_HEIGHT, MAINWINDOW_WIDTH, SHRINK_MAINWINDOW_HEIGHT } from "./constants.js";

type test = string;

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
        width: MAINWINDOW_WIDTH,
        maxWidth: MAINWINDOW_WIDTH,
        height: MAINWINDOW_HEIGHT,
        minHeight: SHRINK_MAINWINDOW_HEIGHT,
        frame: false,
        alwaysOnTop: true,
        resizable: false
    });
    if(isDev()) {
        mainWindow.loadURL("http://localhost:5123");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }

    pollResources(mainWindow);
    getDate(mainWindow);
    getTime(mainWindow);

    ipcMainHandle('getStaticData', () => {
        return getStaticData();
    });

    ipcMainHandle('toggleShrinkWindow', () => {
        const newHeight = mainWindow.getSize()[1] === SHRINK_MAINWINDOW_HEIGHT ? MAINWINDOW_HEIGHT : SHRINK_MAINWINDOW_HEIGHT;

        mainWindow.setResizable(true);
        mainWindow.setSize(MAINWINDOW_WIDTH, newHeight);
        mainWindow.setResizable(false);
        const isShrink = mainWindow.getSize()[1] === SHRINK_MAINWINDOW_HEIGHT;
        return isShrink;
    })
});

