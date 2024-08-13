"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageFirstAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class PageFirstAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        ayahs = ayahs.filter(ayah => ayah.surahAyahNumber !== 1);
        if (ayahs.length === 0) {
            throw new Error('No valid ayah found in the specified range.');
        }
        const randomIndex = Math.floor(Math.random() * ayahs.length);
        const ayah = ayahs[randomIndex];
        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }
        const pageFirstAyah = this.dataLoader.getDataByPage(ayah.pageNumber)[0];
        if (!pageFirstAyah) {
            throw new Error('Failed to find the first ayah of the page.');
        }
        const pages = new Set();
        pages.add(ayah.pageNumber);
        while (pages.size < 5) {
            const randomPage = Math.floor(Math.random() * (endPage - startPage + 1)) + startPage;
            pages.add(randomPage);
        }
        const options = Array.from(pages).map(page => {
            const firstAyah = this.dataLoader.getDataByPage(page)[0];
            return this.formatAyahText(firstAyah.ayahText);
        });
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(this.formatAyahText(pageFirstAyah.ayahText));
        return {
            question: PageFirstAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: correctIndex,
        };
    }
    get questionText() {
        return PageFirstAyahGenerator.QUESTION_TEXT;
    }
}
exports.PageFirstAyahGenerator = PageFirstAyahGenerator;
PageFirstAyahGenerator.QUESTION_TEXT = 'ما هي الآية التي تبدأ بها الصفحة؟';
