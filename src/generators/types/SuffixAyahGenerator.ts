import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class SuffixAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي نهاية الآية؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        const questionAyahIndex = filteredAyahs.getAyahIndex(currentIndex);
        const questionAyah = filteredAyahs.getAyahByIndex(questionAyahIndex);
        const previousCurrentIndex = filteredAyahs.getPreviousAyah(questionAyahIndex);
        const nextSuffixes = filteredAyahs.getNextUniqueAyaSuffixes(previousCurrentIndex, 5);
        if (!nextSuffixes || nextSuffixes.length < 5) {
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
