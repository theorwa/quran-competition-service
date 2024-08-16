"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionGeneratorFactory = void 0;
const QuestionType_1 = require("../models/QuestionType");
const NextAyahGenerator_1 = require("./types/NextAyahGenerator");
const PreviousAyahGenerator_1 = require("./types/PreviousAyahGenerator");
const SuffixAyahGenerator_1 = require("./types/SuffixAyahGenerator");
const PageNumberGenerator_1 = require("./types/PageNumberGenerator");
const AyatPageCountGenerator_1 = require("./types/AyatPageCountGenerator");
const SuffixPreviousAyahGenerator_1 = require("./types/SuffixPreviousAyahGenerator");
class QuestionGeneratorFactory {
    static createGenerator(type) {
        if (type === 'random') {
            const keys = Object.keys(QuestionType_1.QuestionType);
            type = QuestionType_1.QuestionType[keys[Math.floor(Math.random() * keys.length)]];
        }
        switch (type) {
            case QuestionType_1.QuestionType.NextAyah:
                return new NextAyahGenerator_1.NextAyahGenerator();
            case QuestionType_1.QuestionType.PreviousAyah:
                return new PreviousAyahGenerator_1.PreviousAyahGenerator();
            case QuestionType_1.QuestionType.SuffixAyah:
                return new SuffixAyahGenerator_1.SuffixAyahGenerator();
            case QuestionType_1.QuestionType.PageNumber:
                return new PageNumberGenerator_1.PageNumberGenerator();
            case QuestionType_1.QuestionType.AyatPageCount:
                return new AyatPageCountGenerator_1.AyatPageCountGenerator();
            case QuestionType_1.QuestionType.SuffixPreviousAyah:
                return new SuffixPreviousAyahGenerator_1.SuffixPreviousAyahGenerator();
            default:
                return new NextAyahGenerator_1.NextAyahGenerator();
        }
    }
}
exports.QuestionGeneratorFactory = QuestionGeneratorFactory;
