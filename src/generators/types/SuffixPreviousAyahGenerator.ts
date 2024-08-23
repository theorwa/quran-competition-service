import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class SuffixPreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي نهاية الآية السابقة؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        if (currentIndex < 1 || currentIndex >= filteredAyahs.getAyahsCount()) {
            currentIndex = Math.floor(Math.random() * (filteredAyahs.getAyahsCount() - 1)) + 1;
        }
        const questionAyah = filteredAyahs.getAyahByIndex(currentIndex);
        const previousSuffixes = filteredAyahs.getPreviousUniqueAyaSuffixes(currentIndex, 5);
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
