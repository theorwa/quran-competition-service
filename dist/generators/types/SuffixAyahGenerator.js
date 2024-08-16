"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class SuffixAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const suffixes = this.getNextUniqueAyaSuffixes(ayahs, randomIndex, 4);
        if (!suffixes || suffixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = ayahs[randomIndex].suffix;
        suffixes.push(ayahs[randomIndex].suffix);
        const shuffledOptions = this.shuffleArray(suffixes);
        return {
            question: SuffixAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }
    get questionText() {
        return SuffixAyahGenerator.QUESTION_TEXT;
    }
}
exports.SuffixAyahGenerator = SuffixAyahGenerator;
SuffixAyahGenerator.QUESTION_TEXT = 'ما هي خاتمة الآية؟';
