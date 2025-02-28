type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    storageData: number;
};

type StaticData = {
    totalStorage: number;
    cpuModel: string;
    totalMemoryGB: number;
};

type DateTime = {
    date: {
        day: string;
        month: string;
        number: number;
    };
    time: string;
}

type DateObj = {
    day: string;
    month: string;
    number: number;
}

//Mapping all event's names and response's types
//Key: event's name
//Type: returns value's type
type EventPayloadMapping = {
    statistics: Statistics;
    getStaticData: StaticData;
    getTime: string;
    getDate: DateObj;
    toggleShrinkWindow: boolean;
}

//Any new events that are exposed to the ui needs to be added to the window.electron in order to be
//used properly
interface Window {
    electron: {
        subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
        getStaticData: () => Promise<StaticData>;
        getTime: (callback : (time: string) => void) => void;
        getDate: (callback: (date: DateObj) => void) => void;
        toggleShrinkWindow: () => boolean;
    }
}