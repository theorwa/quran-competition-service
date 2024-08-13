import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class PreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية السابقة؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1)) + 5;
        const ayah = ayahs[randomIndex];
        let previousAyahs = [];

        for (let i = randomIndex - 1; i >= 0 && previousAyahs.length < 5; i--) {
            const candidateAyah = ayahs[i];
            if (previousAyahs.length === 0 || !this.isFirst5WordsSame(candidateAyah.ayahText, ayah.ayahText)) {
                previousAyahs.push(candidateAyah);
            }
        }

        if (previousAyahs.length < 5) {
            const additionalAyahs = this.getRandomOptions(ayahs, previousAyahs, 5 - previousAyahs.length);
            previousAyahs = previousAyahs.concat(additionalAyahs);
        }

        if (!ayah || !previousAyahs[previousAyahs.length - 1]) {
            throw new Error('Failed to generate a valid question.');
        }

        const correctAyah = previousAyahs[previousAyahs.length - 1];
        const shuffledOptions = this.shuffleArray(previousAyahs);

        return {
            question: PreviousAyahGenerator.QUESTION_TEXT,
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
        return PreviousAyahGenerator.QUESTION_TEXT;
    }
}
