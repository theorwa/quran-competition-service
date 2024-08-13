"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageStartAyahGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class PageStartAyahGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6).filter(a => a.surahAyahNumber !== 1);
        if (ayahs.length === 0) {
            throw new Error('No eligible ayahs found in the specified range.');
        }
        const randomIndex = Math.floor(Math.random() * ayahs.length);
        const ayah = ayahs[randomIndex];
        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctPage = ayah.pageNumber;
        const correctAyah = this.dataLoader.getDataByPageNumber(correctPage).find(a => a.surahAyahNumber === 1);
        if (!correctAyah) {
            throw new Error('Failed to find the first ayah on the correct page.');
        }
        const pageNumbers = new Set();
        pageNumbers.add(correctPage);
        while (pageNumbers.size < 5) {
            const randomPage = Math.floor(Math.random() * (endPage - startPage + 1)) + startPage;
            pageNumbers.add(randomPage);
        }
        const options = Array.from(pageNumbers).map(pageNumber => {
            const pageStartAyah = this.dataLoader.getDataByPageNumber(pageNumber).find(a => a.surahAyahNumber === 1);
            return this.formatAyahText(pageStartAyah ? pageStartAyah.ayahText : 'لا توجد آية');
        });
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(this.formatAyahText(correctAyah.ayahText));
        return {
            question: PageStartAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: correctIndex,
        };
    }
    get questionText() {
        return PageStartAyahGenerator.QUESTION_TEXT;
    }
}
exports.PageStartAyahGenerator = PageStartAyahGenerator;
PageStartAyahGenerator.QUESTION_TEXT = 'ما هي الآية التي تبدأ بها الصفحة؟';
