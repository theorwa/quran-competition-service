import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class SuffixPreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي نهاية الآية السابقة؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        const questionAyahIndex = filteredAyahs.getAyahIndex(currentIndex);
        const questionAyah = filteredAyahs.getAyahByIndex(questionAyahIndex);
        const previousSuffixes = filteredAyahs.getPreviousUniqueAyaSuffixes(questionAyahIndex, 5);
        if (!previousSuffixes || previousSuffixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = previousSuffixes[0];
        const shuffledOptions = this.shuffleArray(previousSuffixes);
        return {
            question: SuffixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: questionAyah.ayahText,
            ayahNumber: `${questionAyah.surahName}:${questionAyah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return SuffixPreviousAyahGenerator.QUESTION_TEXT;
    }
}
