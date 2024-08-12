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
}
exports.BaseQuestionGenerator = BaseQuestionGenerator;
BaseQuestionGenerator.MAX_RETRIES = 3;
