"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class NextAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const nextPrefixes = this.getNextUniqueAyaPrefixes(ayahs, randomIndex, 5);
        if (!ayahs[randomIndex] || nextPrefixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = nextPrefixes[0];
        const shuffledOptions = this.shuffleArray(nextPrefixes);
        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }
    get questionText() {
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
exports.NextAyahGenerator = NextAyahGenerator;
NextAyahGenerator.QUESTION_TEXT = 'ما هي الآية التالية؟';
