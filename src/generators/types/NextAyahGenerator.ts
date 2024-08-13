import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class NextAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية التالية؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const ayah = ayahs[randomIndex];
        let nextAyahs = [];

        for (let i = randomIndex + 1; i < ayahs.length && nextAyahs.length < 5; i++) {
            const candidateAyah = ayahs[i];
            if (nextAyahs.length === 0 || !this.isFirst5WordsSame(candidateAyah.ayahText, ayah.ayahText)) {
                nextAyahs.push(candidateAyah);
            }
        }

        if (nextAyahs.length < 5) {
            const additionalAyahs = this.getRandomOptions(ayahs, nextAyahs, 5 - nextAyahs.length);
            nextAyahs = nextAyahs.concat(additionalAyahs);
        }

        if (!ayah || !nextAyahs[0]) {
            throw new Error('Failed to generate a valid question.');
        }

        const correctAyah = nextAyahs[0];
        const shuffledOptions = this.shuffleArray(nextAyahs);

        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map((option) => this.formatAyahText(option.ayahText)),
            correct: shuffledOptions.findIndex(option => option === correctAyah),
        };
    }

    private isFirst5WordsSame(ayahText1: string, ayahText2: string): boolean {
        const words1 = ayahText1.split(' ').slice(0, 5).join(' ');
        const words2 = ayahText2.split(' ').slice(0, 5).join(' ');
        return words1 === words2;
    }

    public get questionText(): string {
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
