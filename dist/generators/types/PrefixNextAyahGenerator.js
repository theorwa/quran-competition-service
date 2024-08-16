"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixNextAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class PrefixNextAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(filteredAyahs, ayahIndex) {
        const randomIndex = ayahIndex !== null ? ayahIndex : Math.floor(Math.random() * Math.max(filteredAyahs.length - 1, 1));
        const nextAyahIndex = this.getNextAyah(filteredAyahs, randomIndex);
        const nextPrefixes = this.getNextUniqueAyaPrefixes(filteredAyahs, nextAyahIndex, 4);
        if (!nextPrefixes || nextPrefixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = filteredAyahs[nextAyahIndex].prefix;
        nextPrefixes.push(filteredAyahs[nextAyahIndex].prefix);
        const shuffledOptions = this.shuffleArray(nextPrefixes);
        return {
            question: PrefixNextAyahGenerator.QUESTION_TEXT,
            ayah: filteredAyahs[randomIndex].ayahText,
            ayahNumber: `${filteredAyahs[randomIndex].surahName}:${filteredAyahs[randomIndex].surahAyahNumber}`,
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
