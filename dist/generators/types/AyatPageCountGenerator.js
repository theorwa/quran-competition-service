"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyatPageCountGenerator = void 0;
const BaseQuestionGenerator_1 = require("../BaseQuestionGenerator");
class AyatPageCountGenerator extends BaseQuestionGenerator_1.BaseQuestionGenerator {
    generateQuestion(startPage, endPage) {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * ayahs.length);
        const ayah = ayahs[randomIndex];
        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctCount = ayahs.filter(a => a.pageNumber === ayah.pageNumber).length;
        const counts = new Set();
        counts.add(correctCount);
        while (counts.size < 5) {
            const randomNearbyCount = correctCount + Math.floor(Math.random() * 5) - 2;
            if (randomNearbyCount > 0) {
                counts.add(randomNearbyCount);
            }
        }
        const options = Array.from(counts);
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(correctCount);
        return {
            question: AyatPageCountGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map(String),
            correct: correctIndex,
        };
    }
    get questionText() {
        return AyatPageCountGenerator.QUESTION_TEXT;
    }
}
exports.AyatPageCountGenerator = AyatPageCountGenerator;
AyatPageCountGenerator.QUESTION_TEXT = 'ما هو عدد الآيات في الصفحة؟';
