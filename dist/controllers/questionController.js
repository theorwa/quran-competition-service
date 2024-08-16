"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const QuestionGeneratorFactory_1 = require("../generators/QuestionGeneratorFactory");
const QuestionType_1 = require("../models/QuestionType");
const PageRangeSpecification_1 = require("../specifications/PageRangeSpecification");
const SurahNumberSpecification_1 = require("../specifications/SurahNumberSpecification");
const JuzNumberSpecification_1 = require("../specifications/JuzNumberSpecification");
const HizbNumberSpecification_1 = require("../specifications/HizbNumberSpecification");
const OrSpecification_1 = require("../specifications/OrSpecification");
class QuestionController {
    static generateQuestion(req, res) {
        const questionType = req.query.question_type || QuestionType_1.QuestionType.PrefixNextAyah;
        const specifications = [];
        if (req.query.pages) {
            const pageSpecs = req.query.pages.split(',').map(range => {
                const [start, end] = range.split('-').map(Number);
                if (end !== undefined) {
                    return new PageRangeSpecification_1.PageRangeSpecification(start, end);
                }
                else {
                    return new PageRangeSpecification_1.PageRangeSpecification(start, start);
                }
            });
            const combinedPageSpec = pageSpecs.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), pageSpecs[0]);
            specifications.push(combinedPageSpec);
        }
        if (req.query.surah_number) {
            const surahNumbers = req.query.surah_number.split(',').map(Number);
            const surahSpecs = surahNumbers.map(num => new SurahNumberSpecification_1.SurahNumberSpecification(num));
            const combinedSurahSpec = surahSpecs.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), surahSpecs[0]);
            specifications.push(combinedSurahSpec);
        }
        if (req.query.juz_number) {
            const juzNumbers = req.query.juz_number.split(',').map(Number);
            const juzSpecs = juzNumbers.map(num => new JuzNumberSpecification_1.JuzNumberSpecification(num));
            const combinedJuzSpec = juzSpecs.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), juzSpecs[0]);
            specifications.push(combinedJuzSpec);
        }
        if (req.query.hizb_number) {
            const hizbNumbers = req.query.hizb_number.split(',').map(Number);
            const hizbSpecs = hizbNumbers.map(num => new HizbNumberSpecification_1.HizbNumberSpecification(num));
            const combinedHizbSpec = hizbSpecs.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), hizbSpecs[0]);
            specifications.push(combinedHizbSpec);
        }
        let combinedSpecification = null;
        if (specifications.length > 0) {
            combinedSpecification = specifications.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), specifications[0]);
        }
        try {
            const generator = QuestionGeneratorFactory_1.QuestionGeneratorFactory.createGenerator(questionType);
            const question = generator.generate(combinedSpecification);
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
