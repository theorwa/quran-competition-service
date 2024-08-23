import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class PrefixPreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي بداية الآية السابقة؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        if (currentIndex < 1 || currentIndex >= filteredAyahs.getAyahsCount()) {
            currentIndex = Math.floor(Math.random() * (filteredAyahs.getAyahsCount() - 1)) + 1;
        }
        const questionAyah = filteredAyahs.getAyahByIndex(currentIndex);
        const previousPrefixes = filteredAyahs.getPreviousUniqueAyaPrefixes(currentIndex, 4);
        if (!previousPrefixes || previousPrefixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = previousPrefixes[0];
        previousPrefixes.push(questionAyah.getPrefix());
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
