import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class PreviousAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية السابقة؟';

    generate(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1)) + 5;
        const ayah = ayahs[randomIndex];
        let previousAyahs = ayahs.slice(Math.max(randomIndex - 5, 0), randomIndex);

        if (previousAyahs.length < 5) {
            const additionalAyahs = this.getRandomOptions(ayahs, previousAyahs, 5 - previousAyahs.length);
            previousAyahs = additionalAyahs.concat(previousAyahs);
        }

        // The last ayah in previousAyahs should be the correct one
        const correctAyah = previousAyahs[previousAyahs.length - 1];

        const shuffledOptions = this.shuffleArray(previousAyahs);

        return {
            question: PreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            options: shuffledOptions.map((option) => option.ayahText),
            correct: shuffledOptions.findIndex(option => option === correctAyah),
        };
    }

    public get questionText(): string {
        return PreviousAyahGenerator.QUESTION_TEXT;
    }
}
