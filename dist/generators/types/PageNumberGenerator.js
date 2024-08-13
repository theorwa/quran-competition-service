"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNumberGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class PageNumberGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * ayahs.length);
        const ayah = ayahs[randomIndex];
        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctPageNumber = ayah.pageNumber;
        const rangeSize = endPage - startPage + 1;
        const pageNumbers = new Set();
        pageNumbers.add(correctPageNumber);
        for (let i = startPage; i <= endPage && pageNumbers.size < 5; i++) {
            pageNumbers.add(i);
        }
        let offset = 1;
        while (pageNumbers.size < 5 && (startPage - offset >= 1 || endPage + offset <= 604)) {
            if (startPage - offset >= 1)
                pageNumbers.add(startPage - offset);
            if (endPage + offset <= 604)
                pageNumbers.add(endPage + offset);
            offset++;
        }
        const options = Array.from(pageNumbers);
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(correctPageNumber);
        return {
            question: PageNumberGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map(String),
            correct: correctIndex,
        };
    }
    get questionText() {
        return PageNumberGenerator.QUESTION_TEXT;
    }
}
exports.PageNumberGenerator = PageNumberGenerator;
PageNumberGenerator.QUESTION_TEXT = 'ما هو رقم الصفحة؟';
