"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const CSVDataLoader_1 = require("./utils/CSVDataLoader");
const WaitForDataLoad_1 = require("./utils/WaitForDataLoad");
const QuestionRoute_1 = __importDefault(require("./routes/QuestionRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(QuestionRoute_1.default);
const dataLoader = CSVDataLoader_1.CSVDataLoader.getInstance();
(0, WaitForDataLoad_1.waitForDataLoad)(dataLoader).then(() => {
    app.listen(config_1.config.port, () => {
        console.log(`Server running on port ${config_1.config.port}`);
    });
}).catch(error => {
    console.error('Failed to load CSV data:', error);
});
