import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {Ayah} from "../../utils/CSVDataLoader";

export class PrefixPreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي بداية الآية السابقة؟';

    protected generateQuestion(filteredAyahs: Ayah[], ayahIndex: number | null): Question {
        const randomIndex = ayahIndex !== null ? ayahIndex : Math.floor(Math.random() * Math.max(filteredAyahs.length - 1, 1));
        const previousPrefixes = this.getPreviousUniqueAyaPrefixes(filteredAyahs, randomIndex, 5);
        if (!previousPrefixes || previousPrefixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = previousPrefixes[0];
        const shuffledOptions = this.shuffleArray(previousPrefixes);
        return {
            question: PrefixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: filteredAyahs[randomIndex].ayahText,
            ayahNumber: `${filteredAyahs[randomIndex].surahName}:${filteredAyahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return PrefixPreviousAyahGenerator.QUESTION_TEXT;
    }
}
