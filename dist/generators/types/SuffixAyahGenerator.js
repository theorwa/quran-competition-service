"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class SuffixAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const ayah = ayahs[randomIndex];
        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }
        const ayahWords = ayah.ayahText.split(' ');
        const firstPart = ayahWords.length > 4 ? ayahWords.slice(0, 4).join(' ') + ' ...' : ayah.ayahText;
        const correctSuffix = ayahWords.length > 4 ? ayahWords.slice(-4).join(' ') : ayah.ayahText;
        let suffixOptions = ayahs.slice(randomIndex + 1, randomIndex + 6).map(a => {
            const words = a.ayahText.split(' ');
            return words.length > 4 ? words.slice(-4).join(' ') : a.ayahText;
        });
        if (suffixOptions.length < 4) {
            const additionalOptions = this.getRandomOptions(ayahs, ayahs.slice(randomIndex + 1, randomIndex + 6), 4 - suffixOptions.length).map(a => {
                const words = a.ayahText.split(' ');
                return words.length > 4 ? words.slice(-4).join(' ') : a.ayahText;
            });
            suffixOptions = suffixOptions.concat(additionalOptions);
        }
        const options = this.shuffleArray([correctSuffix, ...suffixOptions]);
        return {
            question: SuffixAyahGenerator.QUESTION_TEXT,
            ayah: firstPart,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: options,
            correct: options.findIndex(option => option === correctSuffix),
        };
    }
    get questionText() {
        return SuffixAyahGenerator.QUESTION_TEXT;
    }
}
exports.SuffixAyahGenerator = SuffixAyahGenerator;
SuffixAyahGenerator.QUESTION_TEXT = 'ما هي خاتمة الآية؟';
