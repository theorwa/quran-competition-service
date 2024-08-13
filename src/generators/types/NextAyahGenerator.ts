import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class NextAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية التالية؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const ayah = ayahs[randomIndex];
        let nextAyahs = ayahs.slice(randomIndex + 1, randomIndex + 6);

        if (nextAyahs.length < 5) {
            const additionalAyahs = this.getRandomOptions(ayahs, nextAyahs, 5 - nextAyahs.length);
            nextAyahs = nextAyahs.concat(additionalAyahs);
        }

        if (!ayah || !nextAyahs[0]) {
            throw new Error('Failed to generate a valid question.');
        }

        // The first ayah in nextAyahs should be the correct one
        const correctAyah = nextAyahs[0];

        const shuffledOptions = this.shuffleArray(nextAyahs);

        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map((option) => option.ayahText),
            correct: shuffledOptions.findIndex(option => option === correctAyah),
        };
    }

    public get questionText(): string {
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
