"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuestion = exports.getQuestions = void 0;
const questionService_1 = require("../services/questionService");
const questionService = new questionService_1.QuestionService();
const getQuestions = (req, res) => {
    const questions = questionService.getQuestions();
    res.json(questions);
};
exports.getQuestions = getQuestions;
const generateQuestion = (req, res) => {
    const question = questionService.generateQuestion();
    res.json(question);
};
exports.generateQuestion = generateQuestion;
