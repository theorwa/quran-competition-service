"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixPreviousAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class SuffixPreviousAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1)) + 5;
        const previousAyahIndex = this.getPreviousAyah(ayahs, randomIndex);
        const previousSuffixes = this.getPreviousUniqueAyaSuffixes(ayahs, previousAyahIndex, 4);
        if (!previousSuffixes || previousSuffixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = ayahs[previousAyahIndex].suffix;
        previousSuffixes.push(ayahs[previousAyahIndex].suffix);
        const shuffledOptions = this.shuffleArray(previousSuffixes);
        return {
            question: SuffixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
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
