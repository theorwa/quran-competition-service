"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionGenerator = void 0;
const CSVDataLoader_1 = require("../utils/CSVDataLoader");
class QuestionGenerator {
    constructor() {
        this.dataLoader = CSVDataLoader_1.CSVDataLoader.getInstance();
    }
}
exports.QuestionGenerator = QuestionGenerator;
