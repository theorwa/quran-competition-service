import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";
import { QuestionGeneratorConfig, getConfigWithDefaults } from '../../types/QuestionGeneratorConfig';

export class SuffixAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي نهاية الآية؟';

    public publicGenerateQuestion(filteredAyahs: FilteredAyahs, config: QuestionGeneratorConfig): Question {
        return this.generateQuestion(filteredAyahs, getConfigWithDefaults(config));
    }

    protected generateQuestion(filteredAyahs: FilteredAyahs, config: Required<QuestionGeneratorConfig>): Question {
        const { currentIndex, choices } = config;
        const questionAyahIndex = filteredAyahs.getAyahIndex(currentIndex);
        const questionAyah = filteredAyahs.getAyahByIndex(questionAyahIndex);
        const previousCurrentIndex = filteredAyahs.getPreviousAyah(questionAyahIndex);
        const nextSuffixes = filteredAyahs.getNextUniqueAyaSuffixes(previousCurrentIndex, choices);
        if (!nextSuffixes || nextSuffixes.length < choices) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = nextSuffixes[0];
        const shuffledOptions = this.shuffleArray(nextSuffixes);
        return {
            question: SuffixAyahGenerator.QUESTION_TEXT,
            ayah: questionAyah.getPrefix(),
            ayahNumber: `${questionAyah.surahName}:${questionAyah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return SuffixAyahGenerator.QUESTION_TEXT;
    }
}
