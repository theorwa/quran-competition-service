import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {Ayah} from "../../utils/CSVDataLoader";

export class SuffixPreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي نهاية الآية السابقة؟';

    protected generateQuestion(filteredAyahs: Ayah[], currentIndex: number | null): Question {
        const randomIndex = currentIndex !== null ? currentIndex : Math.floor(Math.random() * Math.max(filteredAyahs.length - 1, 1));
        const previousSuffixes = this.getPreviousUniqueAyaSuffixes(filteredAyahs, randomIndex, 5);
        if (!previousSuffixes || previousSuffixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = previousSuffixes[0];
        const shuffledOptions = this.shuffleArray(previousSuffixes);
        return {
            question: SuffixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: filteredAyahs[randomIndex].ayahText,
            ayahNumber: `${filteredAyahs[randomIndex].surahName}:${filteredAyahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return SuffixPreviousAyahGenerator.QUESTION_TEXT;
    }
}
