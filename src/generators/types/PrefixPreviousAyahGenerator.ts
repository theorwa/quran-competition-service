import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class PrefixPreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية السابقة؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1)) + 5;
        const previousAyahIndex = this.getPreviousAyah(ayahs, randomIndex);
        const previousPrefixes = this.getPreviousUniqueAyaPrefixes(ayahs, previousAyahIndex, 4);
        if (!previousPrefixes || previousPrefixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = ayahs[previousAyahIndex].prefix;
        previousPrefixes.push(ayahs[previousAyahIndex].prefix);
        const shuffledOptions = this.shuffleArray(previousPrefixes);
        return {
            question: PrefixPreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayahs[randomIndex].ayahText,
            ayahNumber: `${ayahs[randomIndex].surahName}:${ayahs[randomIndex].surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };
    }

    public get questionText(): string {
        return PrefixPreviousAyahGenerator.QUESTION_TEXT;
    }
}
