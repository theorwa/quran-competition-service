"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousAyahGenerator = void 0;
const QuestionGenerator_1 = require("./QuestionGenerator");
class PreviousAyahGenerator extends QuestionGenerator_1.QuestionGenerator {
    generate(startPage, endPage) {
        const ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        const randomIndex = Math.floor(Math.random() * (ayahs.length - 1));
        const ayah = ayahs[randomIndex];
        const previousAyah = ayahs[randomIndex - 1];
        const options = [previousAyah, ...this.getRandomOptions(ayahs, previousAyah)];
        const shuffledOptions = this.shuffleArray(options);
        return {
            question: PreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            options: shuffledOptions.map((option) => option.ayahText),
            correct: shuffledOptions.indexOf(previousAyah),
        };
    }
    getRandomOptions(ayahs, correctAyah) {
        const randomAyahs = ayahs.filter((a) => a !== correctAyah);
        return randomAyahs.slice(0, 3);
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    get questionText() {
        return PreviousAyahGenerator.QUESTION_TEXT;
    }
}
exports.PreviousAyahGenerator = PreviousAyahGenerator;
PreviousAyahGenerator.QUESTION_TEXT = 'What is the previous ayah?';
