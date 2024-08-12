import { CSVDataLoader } from './CSVDataLoader';

export const waitForDataLoad = (loader: CSVDataLoader): Promise<void> => {
    return new Promise<void>((resolve) => {
        const checkInterval = setInterval(() => {
            if (loader.isDataLoaded()) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100); // Check every 100ms
    });
};
