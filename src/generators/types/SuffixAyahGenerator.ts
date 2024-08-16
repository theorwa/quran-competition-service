import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class SuffixAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي خاتمة الآية؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);
        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const suffixes = this.getNextUniqueAyaSuffixes(ayahs, randomIndex, 4);
        if (!suffixes || suffixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = ayahs[randomIndex].suffix;
        suffixes.push(ayahs[randomIndex].suffix);
        const shuffledOptions = this.shuffleArray(suffixes);
        return {
            question: SuffixAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return SuffixAyahGenerator.QUESTION_TEXT;
    }
}
