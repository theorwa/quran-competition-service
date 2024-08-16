"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQuestionGenerator = void 0;
const QuestionGenerator_1 = require("./QuestionGenerator");
class BaseQuestionGenerator extends QuestionGenerator_1.QuestionGenerator {
    generate(startPage, endPage) {
        let attempts = 0;
        let question = null;
        while (attempts < BaseQuestionGenerator.MAX_RETRIES && !question) {
            try {
                question = this.generateQuestion(startPage, endPage);
            }
            catch (error) {
                attempts++;
                if (attempts >= BaseQuestionGenerator.MAX_RETRIES) {
                    throw new Error('Failed to generate a question after multiple attempts.');
                }
            }
        }
        return question;
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    getRandomOptions(allAyahs, exclude, count) {
        const availableAyahs = allAyahs.filter((a) => !exclude.includes(a));
        const randomOptions = [];
        while (randomOptions.length < count && availableAyahs.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableAyahs.length);
            randomOptions.push(availableAyahs.splice(randomIndex, 1)[0]);
        }
        return randomOptions;
    }
    expandPageRange(startPage, endPage, minAyahs) {
        let ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        while (ayahs.length < minAyahs && (startPage > 1 || endPage < 604)) {
            if (startPage > 1)
                startPage--;
            if (endPage < 604)
                endPage++;
            ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        }
        return ayahs;
    }
    getNextAyah(ayahs, randomIndex) {
        return (randomIndex + 1) % ayahs.length;
    }
    getPreviousAyah(ayahs, randomIndex) {
        return (randomIndex - 1 + ayahs.length) % ayahs.length;
    }
    getNextAyahs(ayahs, randomIndex, count) {
        const nextAyahs = [];
        for (let i = 1; i <= count; i++) {
            nextAyahs.push(ayahs[this.getNextAyah(ayahs, randomIndex + i)]);
        }
        return nextAyahs;
    }
    getPreviousAyahs(ayahs, randomIndex, count) {
        const previousAyahs = [];
        for (let i = 1; i <= count; i++) {
            previousAyahs.push(ayahs[this.getPreviousAyah(ayahs, randomIndex - i)]);
        }
        return previousAyahs;
    }
    getNextUniqueAyaPrefixes(ayahs, randomIndex, count) {
        const uniqueAyaPrefixes = [];
        let currentIndex = randomIndex;
        while (uniqueAyaPrefixes.length < count) {
            const nextIndex = this.getNextAyah(ayahs, currentIndex);
            if (!uniqueAyaPrefixes.includes(ayahs[nextIndex].prefix)) {
                uniqueAyaPrefixes.push(ayahs[nextIndex].prefix);
            }
            currentIndex = nextIndex;
        }
        return uniqueAyaPrefixes;
    }
    getPreviousUniqueAyaPrefixes(ayahs, randomIndex, count) {
        const uniqueAyaPrefixes = [];
        let currentIndex = randomIndex;
        while (uniqueAyaPrefixes.length < count) {
            const previousIndex = this.getPreviousAyah(ayahs, currentIndex);
            if (!uniqueAyaPrefixes.includes(ayahs[previousIndex].prefix)) {
                uniqueAyaPrefixes.push(ayahs[previousIndex].prefix);
            }
            currentIndex = previousIndex;
        }
        return uniqueAyaPrefixes;
    }
    getNextUniqueAyaSuffixes(ayahs, randomIndex, count) {
        const uniqueAyaSuffixes = [];
        let currentIndex = randomIndex;
        while (uniqueAyaSuffixes.length < count) {
            const nextIndex = this.getNextAyah(ayahs, currentIndex);
            if (!uniqueAyaSuffixes.includes(ayahs[nextIndex].suffix)) {
                uniqueAyaSuffixes.push(ayahs[nextIndex].suffix);
            }
            currentIndex = nextIndex;
        }
        return uniqueAyaSuffixes;
    }
    getPreviousUniqueAyaSuffixes(ayahs, randomIndex, count) {
        const uniqueAyaSuffixes = [];
        let currentIndex = randomIndex;
        while (uniqueAyaSuffixes.length < count) {
            const previousIndex = this.getPreviousAyah(ayahs, currentIndex);
            if (!uniqueAyaSuffixes.includes(ayahs[previousIndex].suffix)) {
                uniqueAyaSuffixes.push(ayahs[previousIndex].suffix);
            }
            currentIndex = previousIndex;
        }
        return uniqueAyaSuffixes;
    }
    formatAyahText(ayahText) {
        const words = ayahText.split(' ');
        return words.length > 5 ? words.slice(0, 5).join(' ') + ' ...' : ayahText;
    }
}
exports.BaseQuestionGenerator = BaseQuestionGenerator;
BaseQuestionGenerator.MAX_RETRIES = 3;
