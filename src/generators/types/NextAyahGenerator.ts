import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {Ayah} from "../../utils/CSVDataLoader";

export class NextAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية التالية؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const nextPrefixes = this.getNextUniqueAyaPrefixes(ayahs, randomIndex, 5);
        if (!ayahs[randomIndex] || nextPrefixes.length < 5) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = nextPrefixes[0].ayahText;
        const shuffledOptions = this.shuffleArray(nextPrefixes.map((option) => option.ayahText));
        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };

    }

    public get questionText(): string {
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
