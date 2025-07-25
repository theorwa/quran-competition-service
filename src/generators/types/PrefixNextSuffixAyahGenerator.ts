import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import { FilteredAyahs } from "../../models/FilteredAyahs";
import { QuestionGeneratorConfig, getConfigWithDefaults } from '../../types/QuestionGeneratorConfig';

export class PrefixNextSuffixAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي بداية الآية التالية؟';

    public publicGenerateQuestion(filteredAyahs: FilteredAyahs, config: QuestionGeneratorConfig): Question {
        return this.generateQuestion(filteredAyahs, getConfigWithDefaults(config));
    }

    protected generateQuestion(filteredAyahs: FilteredAyahs, config: Required<QuestionGeneratorConfig>): Question {
        const { currentIndex, choices } = config;
        let adjustedIndex = currentIndex;
        
        if (currentIndex < 0 || currentIndex >= filteredAyahs.getAyahsCount() - 1) {
            adjustedIndex = Math.floor(Math.random() * (filteredAyahs.getAyahsCount() - 1));
        }
        
        const questionAyah = filteredAyahs.getAyahByIndex(adjustedIndex);
        const nextIndex = filteredAyahs.getNextAyah(adjustedIndex);
        const MAX_OPTIONS = Math.min(choices - 1, filteredAyahs.getAyahsCount() - 1);
        const nextPrefixes = filteredAyahs.getNextUniqueAyaPrefixes(nextIndex, MAX_OPTIONS);
        if (!nextPrefixes || nextPrefixes.length < MAX_OPTIONS) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = filteredAyahs.getAyahByIndex(nextIndex).getPrefix();
        nextPrefixes.push(filteredAyahs.getAyahByIndex(nextIndex).getPrefix());
        const shuffledOptions = this.shuffleArray(nextPrefixes);
        return {
            question: PrefixNextSuffixAyahGenerator.QUESTION_TEXT,
            ayah: questionAyah.getSuffix(),
            ayahNumber: `${questionAyah.surahName}:${questionAyah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };

    }

    public get questionText(): string {
        return PrefixNextSuffixAyahGenerator.QUESTION_TEXT;
    }
}
