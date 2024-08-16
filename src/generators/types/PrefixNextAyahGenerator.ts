import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {Ayah} from "../../utils/CSVDataLoader";

export class PrefixNextAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية التالية؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const nextAyahIndex = this.getNextAyah(ayahs, randomIndex);
        const nextPrefixes = this.getNextUniqueAyaPrefixes(ayahs, nextAyahIndex, 4);
        if (!nextPrefixes || nextPrefixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = ayahs[nextAyahIndex].prefix;
        nextPrefixes.push(ayahs[nextAyahIndex].prefix);
        const shuffledOptions = this.shuffleArray(nextPrefixes);
        return {
            question: PrefixNextAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };

    }

    public get questionText(): string {
        return PrefixNextAyahGenerator.QUESTION_TEXT;
    }
}
