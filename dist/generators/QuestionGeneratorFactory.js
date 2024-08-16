"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionGeneratorFactory = void 0;
const QuestionType_1 = require("../models/QuestionType");
const PrefixNextAyahGenerator_1 = require("./types/PrefixNextAyahGenerator");
const PrefixPreviousAyahGenerator_1 = require("./types/PrefixPreviousAyahGenerator");
const SuffixAyahGenerator_1 = require("./types/SuffixAyahGenerator");
const PageNumberGenerator_1 = require("./types/PageNumberGenerator");
const AyatPageCountGenerator_1 = require("./types/AyatPageCountGenerator");
const SuffixPreviousAyahGenerator_1 = require("./types/SuffixPreviousAyahGenerator");
class QuestionGeneratorFactory {
    static createGenerator(type) {
        if (type === 'random') {
            const keys = Object.keys(QuestionType_1.QuestionType);
            for (let i = keys.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [keys[i], keys[j]] = [keys[j], keys[i]];
            }
            type = QuestionType_1.QuestionType[keys[0]];
        }
        switch (type) {
            case QuestionType_1.QuestionType.PrefixNextAyah:
                return new PrefixNextAyahGenerator_1.PrefixNextAyahGenerator();
            case QuestionType_1.QuestionType.PrefixPreviousAyah:
                return new PrefixPreviousAyahGenerator_1.PrefixPreviousAyahGenerator();
            case QuestionType_1.QuestionType.SuffixAyah:
                return new SuffixAyahGenerator_1.SuffixAyahGenerator();
            case QuestionType_1.QuestionType.PageNumber:
                return new PageNumberGenerator_1.PageNumberGenerator();
            case QuestionType_1.QuestionType.AyatPageCount:
                return new AyatPageCountGenerator_1.AyatPageCountGenerator();
            case QuestionType_1.QuestionType.SuffixPreviousAyah:
                return new SuffixPreviousAyahGenerator_1.SuffixPreviousAyahGenerator();
            default:
                return new PrefixNextAyahGenerator_1.PrefixNextAyahGenerator();
        }
    }
}
exports.QuestionGeneratorFactory = QuestionGeneratorFactory;
