"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class NextAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generate(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const ayah = ayahs[randomIndex];
        let nextAyahs = ayahs.slice(randomIndex + 1, randomIndex + 6);
        if (nextAyahs.length < 5) {
            const additionalAyahs = this.getRandomOptions(ayahs, nextAyahs, 5 - nextAyahs.length);
            nextAyahs = nextAyahs.concat(additionalAyahs);
        }
        const correctAyah = nextAyahs[0];
        const shuffledOptions = this.shuffleArray(nextAyahs);
        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            options: shuffledOptions.map((option) => option.ayahText),
            correct: shuffledOptions.findIndex(option => option === correctAyah),
        };
    }
    get questionText() {
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
exports.NextAyahGenerator = NextAyahGenerator;
NextAyahGenerator.QUESTION_TEXT = 'ما هي الآية التالية؟';
