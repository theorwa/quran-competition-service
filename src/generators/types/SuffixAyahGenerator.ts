import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {Ayah} from "../../utils/CSVDataLoader";

export class SuffixAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي نهاية الآية؟';

    protected generateQuestion(filteredAyahs: Ayah[], ayahIndex: number | null): Question {
        const randomIndex = ayahIndex !== null ? ayahIndex : Math.floor(Math.random() * Math.max(filteredAyahs.length - 1, 1));
        const previousAyahIndex = this.getPreviousAyah(filteredAyahs, randomIndex);
        const nextSuffixes = this.getNextUniqueAyaSuffixes(filteredAyahs, previousAyahIndex, 5);
        if (!nextSuffixes || nextSuffixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = nextSuffixes[0];
        const shuffledOptions = this.shuffleArray(nextSuffixes);
        return {
            question: SuffixAyahGenerator.QUESTION_TEXT,
            ayah: filteredAyahs[randomIndex].prefix,
            ayahNumber: `${filteredAyahs[randomIndex].surahName}:${filteredAyahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return SuffixAyahGenerator.QUESTION_TEXT;
    }
}
