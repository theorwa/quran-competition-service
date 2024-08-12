"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextAyahGenerator = void 0;
const QuestionGenerator_1 = require("./QuestionGenerator");
class NextAyahGenerator extends QuestionGenerator_1.QuestionGenerator {
    generate(startPage, endPage) {
        let ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        while (ayahs.length < 2 && (startPage > 1 || endPage < 604)) {
            if (startPage > 1)
                startPage--;
            if (endPage < 604)
                endPage++;
            ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        }
        if (ayahs.length < 2) {
            throw new Error('Not enough ayahs in the selected page range to generate a question.');
        }
        const randomIndex = Math.floor(Math.random() * (ayahs.length - 1));
        const ayah = ayahs[randomIndex];
        const nextAyah = ayahs[randomIndex + 1];
        if (!ayah || !nextAyah) {
            throw new Error('Unable to find sufficient ayahs for generating a question.');
        }
        const options = [nextAyah, ...this.getRandomOptions(ayahs, nextAyah)];
        const shuffledOptions = this.shuffleArray(options);
        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            options: shuffledOptions.map((option) => option.ayahText),
            correct: shuffledOptions.indexOf(nextAyah),
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
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
exports.NextAyahGenerator = NextAyahGenerator;
NextAyahGenerator.QUESTION_TEXT = 'What is the next ayah?';
