import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class SuffixPreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي نهاية الآية السابقة؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1)) + 5;
        const previousAyahIndex = this.getPreviousAyah(ayahs, randomIndex);
        const previousSuffixes = this.getPreviousUniqueAyaSuffixes(ayahs, previousAyahIndex, 4);
        if (!previousSuffixes || previousSuffixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = ayahs[previousAyahIndex].suffix;
        previousSuffixes.push(ayahs[previousAyahIndex].suffix);
        const shuffledOptions = this.shuffleArray(previousSuffixes);
        return {
            question: SuffixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return SuffixPreviousAyahGenerator.QUESTION_TEXT;
    }
}
