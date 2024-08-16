"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixPreviousAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class PrefixPreviousAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1)) + 5;
        const previousPrefixes = this.getPreviousUniqueAyaPrefixes(ayahs, randomIndex, 5);
        if (!previousPrefixes || previousPrefixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = previousPrefixes[0];
        const shuffledOptions = this.shuffleArray(previousPrefixes);
        return {
            question: PrefixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }
    get questionText() {
        return PrefixPreviousAyahGenerator.QUESTION_TEXT;
    }
}
exports.PrefixPreviousAyahGenerator = PrefixPreviousAyahGenerator;
PrefixPreviousAyahGenerator.QUESTION_TEXT = 'ما هي بداية الآية السابقة؟';
