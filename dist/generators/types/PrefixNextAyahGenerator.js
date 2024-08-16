"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixNextAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class PrefixNextAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const nextAyahIndex = this.getNextAyah(ayahs, randomIndex);
        const nextPrefixes = this.getNextUniqueAyaPrefixes(ayahs, nextAyahIndex, 4);
        if (!nextPrefixes || nextPrefixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = ayahs[nextAyahIndex].prefix;
        nextPrefixes.push(ayahs[nextAyahIndex].prefix);
        const shuffledOptions = this.shuffleArray(nextPrefixes);
        return {
            question: PrefixNextAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }
    get questionText() {
        return PrefixNextAyahGenerator.QUESTION_TEXT;
    }
}
exports.PrefixNextAyahGenerator = PrefixNextAyahGenerator;
PrefixNextAyahGenerator.QUESTION_TEXT = 'ما هي بداية الآية التالية؟';
