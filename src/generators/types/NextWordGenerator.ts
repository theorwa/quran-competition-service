import {BaseQuestionGenerator} from "../BaseQuestionGenerator";
import {Question} from "../../models/Question";
import {FilteredAyahs} from "../../models/FilteredAyahs";
import { QuestionGeneratorConfig, getConfigWithDefaults } from '../../types/QuestionGeneratorConfig';

export class NextWordGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الكلمة التالية؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, config: Required<QuestionGeneratorConfig>): Question {
        const { currentIndex, choices } = config;
        const word = filteredAyahs.getWordByIndex(currentIndex);
        const ayah = filteredAyahs.getAyahByWordIndex(currentIndex);
        const nextWords = filteredAyahs.getNextUniqueWords(currentIndex, choices);
        if (!nextWords || nextWords.length < choices) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = nextWords[0];
        const shuffledOptions = this.shuffleArray(nextWords);
        return {
            question: NextWordGenerator.QUESTION_TEXT,
            ayah: word,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return NextWordGenerator.QUESTION_TEXT;
    }
}