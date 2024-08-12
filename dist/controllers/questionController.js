"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const QuestionGeneratorFactory_1 = require("../generators/QuestionGeneratorFactory");
const QuestionType_1 = require("../models/QuestionType");
class QuestionController {
    static generateQuestion(req, res) {
        const questionType = req.query.question_type || QuestionType_1.QuestionType.NextAyah;
        const startPage = Number(req.query.start_page) || 1;
        const endPage = Number(req.query.end_page) || 604;
        try {
            const generator = QuestionGeneratorFactory_1.QuestionGeneratorFactory.createGenerator(questionType);
            const question = generator.generate(startPage, endPage);
            res.json(question);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
}
exports.QuestionController = QuestionController;
