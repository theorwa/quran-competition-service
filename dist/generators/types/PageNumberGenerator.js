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
        const pageNumbers = new Set();
        pageNumbers.add(correctPageNumber);
        while (pageNumbers.size < 5) {
            const randomPage = Math.floor(Math.random() * 604) + 1;
            pageNumbers.add(randomPage);
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
