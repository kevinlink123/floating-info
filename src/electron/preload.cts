const electron = require('electron');

//To add more functionality remember to also modify the types.d.ts
electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback) => {
        electron.ipcRenderer.on("statistics", (event: any, stats: any) => {
            callback(stats);
        });
    },
    getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
    toggleShrinkWindow: () => electron.ipcRenderer.invoke("toggleShrinkWindow"),
    getTime: (callback) => {
        electron.ipcRenderer.on("getTime", (event: any, time: any) => {
            callback(time);
        });
    },
    getDate: (callback) => {
        electron.ipcRenderer.on("getDate", (event: any, date: any) => {
            callback(date);
        });
    },
} satisfies Window['electron'])