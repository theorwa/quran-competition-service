"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', questionRoutes_1.default);
app.listen(config_1.config.port, () => {
    console.log(`Server running on port ${config_1.config.port}`);
});
