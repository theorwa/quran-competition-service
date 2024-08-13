"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class NextAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const ayah = ayahs[randomIndex];
        let nextAyahs = ayahs.slice(randomIndex + 1, randomIndex + 6);
        if (nextAyahs.length < 5) {
            const additionalAyahs = this.getRandomOptions(ayahs, nextAyahs, 5 - nextAyahs.length);
            nextAyahs = nextAyahs.concat(additionalAyahs);
        }
        if (!ayah || !nextAyahs[0]) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctAyah = nextAyahs[0];
        const shuffledOptions = this.shuffleArray(nextAyahs);
        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map((option) => this.formatAyahText(option.ayahText)),
            correct: shuffledOptions.findIndex(option => option === correctAyah),
        };
    }
    get questionText() {
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
exports.NextAyahGenerator = NextAyahGenerator;
NextAyahGenerator.QUESTION_TEXT = 'ما هي الآية التالية؟';
