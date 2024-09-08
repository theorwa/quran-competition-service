import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import { FilteredAyahs } from "../../models/FilteredAyahs";

export class PrefixNextSuffixAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي بداية الآية التالية؟';

    public publicGenerateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        return this.generateQuestion(filteredAyahs, currentIndex);
    }

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        if (currentIndex < 0 || currentIndex >= filteredAyahs.getAyahsCount() - 1) {
            currentIndex = Math.floor(Math.random() * (filteredAyahs.getAyahsCount() - 1));
        }
        const questionAyah = filteredAyahs.getAyahByIndex(currentIndex);
        const nextIndex = filteredAyahs.getNextAyah(currentIndex);
        const MAX_OPTIONS = Math.min(4, filteredAyahs.getAyahsCount() - 1);
        const nextPrefixes = filteredAyahs.getNextUniqueAyaPrefixes(nextIndex, 4);
        if (!nextPrefixes || nextPrefixes.length < 4) {
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
