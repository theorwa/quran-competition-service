"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class PreviousAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1)) + 5;
        const ayah = ayahs[randomIndex];
        let previousAyahs = ayahs.slice(Math.max(randomIndex - 5, 0), randomIndex);
        if (previousAyahs.length < 5) {
            const additionalAyahs = this.getRandomOptions(ayahs, previousAyahs, 5 - previousAyahs.length);
            previousAyahs = additionalAyahs.concat(previousAyahs);
        }
        if (!ayah || !previousAyahs[previousAyahs.length - 1]) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctAyah = previousAyahs[previousAyahs.length - 1];
        const shuffledOptions = this.shuffleArray(previousAyahs);
        return {
            question: PreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map((option) => this.formatAyahText(option.ayahText)),
            correct: shuffledOptions.findIndex(option => option === correctAyah),
        };
    }
    get questionText() {
        return PreviousAyahGenerator.QUESTION_TEXT;
    }
}
exports.PreviousAyahGenerator = PreviousAyahGenerator;
PreviousAyahGenerator.QUESTION_TEXT = 'ما هي الآية السابقة؟';
