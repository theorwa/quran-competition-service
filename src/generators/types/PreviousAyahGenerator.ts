import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class PreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية السابقة؟';

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
            question: PreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return PreviousAyahGenerator.QUESTION_TEXT;
    }
}
