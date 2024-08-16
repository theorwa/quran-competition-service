"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixPreviousAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class SuffixPreviousAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(filteredAyahs) {
        const randomIndex = Math.floor(Math.random() * Math.max(filteredAyahs.length - 1, 1)) + 5;
        const previousSuffixes = this.getPreviousUniqueAyaSuffixes(filteredAyahs, randomIndex, 5);
        if (!previousSuffixes || previousSuffixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = previousSuffixes[0];
        const shuffledOptions = this.shuffleArray(previousSuffixes);
        return {
            question: SuffixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: filteredAyahs[randomIndex].ayahText,
            ayahNumber: `${filteredAyahs[randomIndex].surahName}:${filteredAyahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }
    get questionText() {
        return SuffixPreviousAyahGenerator.QUESTION_TEXT;
    }
}
exports.SuffixPreviousAyahGenerator = SuffixPreviousAyahGenerator;
SuffixPreviousAyahGenerator.QUESTION_TEXT = 'ما هي نهاية الآية السابقة؟';
