"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForDataLoad = void 0;
const waitForDataLoad = (loader) => {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            if (loader.isDataLoaded()) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
    });
};
exports.waitForDataLoad = waitForDataLoad;
