"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const QuestionGeneratorFactory_1 = require("../generators/QuestionGeneratorFactory");
const QuestionType_1 = require("../models/QuestionType");
const SpecificationFactory_1 = require("../specifications/SpecificationFactory");
const AllAyahsSpecification_1 = require("../specifications/AllAyahsSpecification");
class QuestionController {
    static generateQuestion(req, res) {
        const questionType = req.query.question_type || QuestionType_1.QuestionType.PrefixNextAyah;
        const ayahIndex = req.query.ayah_index ? Number(req.query.ayah_index) : null;
        const specifications = [];
        const pageRangeSpec = SpecificationFactory_1.SpecificationFactory.createPageRangeSpecification(req.query);
        if (pageRangeSpec)
            specifications.push(pageRangeSpec);
        const pagesSpec = SpecificationFactory_1.SpecificationFactory.createPagesSpecification(req.query);
        if (pagesSpec)
            specifications.push(pagesSpec);
        const surahSpec = SpecificationFactory_1.SpecificationFactory.createSurahSpecification(req.query);
        if (surahSpec)
            specifications.push(surahSpec);
        const juzSpec = SpecificationFactory_1.SpecificationFactory.createJuzSpecification(req.query);
        if (juzSpec)
            specifications.push(juzSpec);
        const hizbSpec = SpecificationFactory_1.SpecificationFactory.createHizbSpecification(req.query);
        if (hizbSpec)
            specifications.push(hizbSpec);
        let combinedSpecification = SpecificationFactory_1.SpecificationFactory.combineSpecifications(specifications);
        if (!combinedSpecification) {
            combinedSpecification = new AllAyahsSpecification_1.AllAyahsSpecification();
        }
        try {
            const generator = QuestionGeneratorFactory_1.QuestionGeneratorFactory.createGenerator(questionType);
            const question = generator.generate(combinedSpecification, ayahIndex);
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
