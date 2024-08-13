"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstAyahInPageGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class FirstAyahInPageGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const filteredAyahs = ayahs.filter(ayah => ayah.surahAyahNumber !== 1);
        if (filteredAyahs.length === 0) {
            throw new Error('No valid ayah found in the specified page range.');
        }
        const randomIndex = Math.floor(Math.random() * filteredAyahs.length);
        const ayah = filteredAyahs[randomIndex];
        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }
        const firstAyahOnPage = ayahs.find(a => a.pageNumber === ayah.pageNumber && a.surahAyahNumber === 1);
        if (!firstAyahOnPage) {
            throw new Error('Failed to find the first ayah on the page.');
        }
        const firstAyahs = new Set();
        firstAyahs.add(this.formatAyahText(firstAyahOnPage.ayahText));
        for (let i = startPage; i <= endPage && firstAyahs.size < 5; i++) {
            const firstAyahInPage = ayahs.find(a => a.pageNumber === i && a.surahAyahNumber === 1);
            if (firstAyahInPage) {
                firstAyahs.add(this.formatAyahText(firstAyahInPage.ayahText));
            }
        }
        let offset = 1;
        while (firstAyahs.size < 5 && (startPage - offset >= 1 || endPage + offset <= 604)) {
            if (startPage - offset >= 1) {
                const firstAyahInPreviousPage = ayahs.find(a => a.pageNumber === startPage - offset && a.surahAyahNumber === 1);
                if (firstAyahInPreviousPage) {
                    firstAyahs.add(this.formatAyahText(firstAyahInPreviousPage.ayahText));
                }
            }
            if (endPage + offset <= 604) {
                const firstAyahInNextPage = ayahs.find(a => a.pageNumber === endPage + offset && a.surahAyahNumber === 1);
                if (firstAyahInNextPage) {
                    firstAyahs.add(this.formatAyahText(firstAyahInNextPage.ayahText));
                }
            }
            offset++;
        }
        const options = Array.from(firstAyahs);
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(this.formatAyahText(firstAyahOnPage.ayahText));
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
