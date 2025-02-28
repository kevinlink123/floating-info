import { ipcMain } from "electron";
import { WebContents } from "electron/main";

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

//General handle function for ipc events
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(key: Key, handler: () => EventPayloadMapping[Key]) {
    ipcMain.handle(key, () => handler());
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    webContents: WebContents,
    payload: EventPayloadMapping[Key], 
) {
    webContents.send(key, payload);
}