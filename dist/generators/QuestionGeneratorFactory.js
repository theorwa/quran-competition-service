"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionGeneratorFactory = void 0;
const QuestionType_1 = require("../models/QuestionType");
const NextAyahGenerator_1 = require("./types/NextAyahGenerator");
const PreviousAyahGenerator_1 = require("./types/PreviousAyahGenerator");
const SuffixAyahGenerator_1 = require("./types/SuffixAyahGenerator");
class QuestionGeneratorFactory {
    static createGenerator(type) {
        switch (type) {
            case QuestionType_1.QuestionType.NextAyah:
                return new NextAyahGenerator_1.NextAyahGenerator();
            case QuestionType_1.QuestionType.PreviousAyah:
                return new PreviousAyahGenerator_1.PreviousAyahGenerator();
            case QuestionType_1.QuestionType.SuffixAyah:
                return new SuffixAyahGenerator_1.SuffixAyahGenerator();
            default:
                return new NextAyahGenerator_1.NextAyahGenerator();
        }
    }
}
exports.QuestionGeneratorFactory = QuestionGeneratorFactory;
