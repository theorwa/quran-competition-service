import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class PrefixPreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي بداية الآية السابقة؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        const questionAyahIndex = filteredAyahs.getAyahIndex(currentIndex);
        const questionAyah = filteredAyahs.getAyahByIndex(questionAyahIndex);
        const previousPrefixes = filteredAyahs.getPreviousUniqueAyaPrefixes(questionAyahIndex, 5);
        if (!previousPrefixes || previousPrefixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = previousPrefixes[0];
        const shuffledOptions = this.shuffleArray(previousPrefixes);
        return {
            question: PrefixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: questionAyah.ayahText,
            ayahNumber: `${questionAyah.surahName}:${questionAyah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return PrefixPreviousAyahGenerator.QUESTION_TEXT;
    }
}
