import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {Ayah} from "../../utils/CSVDataLoader";

export class PrefixNextAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي بداية الآية التالية؟';

    protected generateQuestion(filteredAyahs: Ayah[]): Question {
        const randomIndex = Math.floor(Math.random() * Math.max(filteredAyahs.length - 1, 1));
        const nextAyahIndex = this.getNextAyah(filteredAyahs, randomIndex);
        const nextPrefixes = this.getNextUniqueAyaPrefixes(filteredAyahs, nextAyahIndex, 4);
        if (!nextPrefixes || nextPrefixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = filteredAyahs[nextAyahIndex].prefix;
        nextPrefixes.push(filteredAyahs[nextAyahIndex].prefix);
        const shuffledOptions = this.shuffleArray(nextPrefixes);
        return {
            question: PrefixNextAyahGenerator.QUESTION_TEXT,
            ayah: filteredAyahs[randomIndex].ayahText,
            ayahNumber: `${filteredAyahs[randomIndex].surahName}:${filteredAyahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };

    }

    public get questionText(): string {
        return PrefixNextAyahGenerator.QUESTION_TEXT;
    }
}
