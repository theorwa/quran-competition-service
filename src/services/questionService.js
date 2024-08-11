"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const csvParser_1 = require("../utils/csvParser");
const config_1 = require("../config");
class QuestionService {
    constructor() {
        this.questions = [];
        this.loadQuestions();
    }
    loadQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.questions = yield (0, csvParser_1.parseCSV)(config_1.config.csvFilePath);
        });
    }
    getQuestions() {
        return this.questions;
    }
    generateQuestion() {
        // Logic to generate a question from the CSV data
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    }
}
exports.QuestionService = QuestionService;
