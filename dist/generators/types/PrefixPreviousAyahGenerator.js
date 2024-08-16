"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixPreviousAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class PrefixPreviousAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(filteredAyahs) {
        const randomIndex = Math.floor(Math.random() * Math.max(filteredAyahs.length - 1, 1)) + 5;
        const previousPrefixes = this.getPreviousUniqueAyaPrefixes(filteredAyahs, randomIndex, 5);
        if (!previousPrefixes || previousPrefixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = previousPrefixes[0];
        const shuffledOptions = this.shuffleArray(previousPrefixes);
        return {
            question: PrefixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: filteredAyahs[randomIndex].ayahText,
            ayahNumber: `${filteredAyahs[randomIndex].surahName}:${filteredAyahs[randomIndex].surahAyahNumber}`,
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
