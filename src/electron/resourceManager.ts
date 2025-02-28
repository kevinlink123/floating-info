import os from 'os';
import fs from 'fs';
import osUtils from 'os-utils';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util.js';

const POLLING_INTERVAL = 500;   

export function pollResources(mainWindow: BrowserWindow) {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = getRamUsage();
        const storageData = getStorageData();

        ipcWebContentsSend("statistics", mainWindow.webContents, {
            cpuUsage,
            ramUsage,
            storageData: storageData.usage,
        });
    }, POLLING_INTERVAL)
}

export function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage,
        cpuModel,
        totalMemoryGB,
    }
}

export function getTime(mainWindow: BrowserWindow) {
    setInterval(() => {
        const dateObj = new Date();
        ipcWebContentsSend('getTime', mainWindow.webContents, dateObj.toTimeString());
    }, 1000);
}

export function getDate(mainWindow: BrowserWindow) {
    const sendDate = () => {
        const dateObj = new Date();
        const dateArr = dateObj.toDateString().split(" ");

        ipcWebContentsSend('getDate', mainWindow.webContents, {
            day: dateArr[0],
            month: dateArr[1],
            number: Number(dateArr[2]) 
        });
    }
    
    sendDate();
    setInterval(sendDate, 1000);
}

function getCpuUsage(): Promise<number> {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve);
    });
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;
    
    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free/total,
    }
}