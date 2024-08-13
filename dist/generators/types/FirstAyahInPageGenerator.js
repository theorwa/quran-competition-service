"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstAyahInPageGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class FirstAyahInPageGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const filteredAyahs = ayahs.filter(a => a.surahAyahNumber !== 1);
        if (filteredAyahs.length === 0) {
            throw new Error('No valid ayahs found within the specified range.');
        }
        const randomIndex = Math.floor(Math.random() * filteredAyahs.length);
        const ayah = filteredAyahs[randomIndex];
        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctFirstAyah = ayahs.find(a => a.pageNumber === ayah.pageNumber && a.surahAyahNumber === 1);
        if (!correctFirstAyah) {
            throw new Error('Failed to find the first ayah of the correct page.');
        }
        const firstAyahs = new Set();
        firstAyahs.add(this.formatAyahText(correctFirstAyah.ayahText));
        while (firstAyahs.size < 5) {
            const randomPage = Math.floor(Math.random() * (endPage - startPage + 1)) + startPage;
            const firstAyahOfPage = ayahs.find(a => a.pageNumber === randomPage && a.surahAyahNumber === 1);
            if (firstAyahOfPage) {
                firstAyahs.add(this.formatAyahText(firstAyahOfPage.ayahText));
            }
            if (firstAyahs.size < 5 && firstAyahs.size === ayahs.filter(a => a.surahAyahNumber === 1).length) {
                break;
            }
        }
        const options = Array.from(firstAyahs);
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(this.formatAyahText(correctFirstAyah.ayahText));
        return {
            question: FirstAyahInPageGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: correctIndex,
        };
    }
    get questionText() {
        return FirstAyahInPageGenerator.QUESTION_TEXT;
    }
}
exports.FirstAyahInPageGenerator = FirstAyahInPageGenerator;
FirstAyahInPageGenerator.QUESTION_TEXT = 'ما هي الآية التي تبدأ بها الصفحة؟';
