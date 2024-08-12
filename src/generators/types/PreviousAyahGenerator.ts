import { QuestionGenerator } from '../QuestionGenerator';
import { Question } from '../../models/Question';
import { Ayah } from '../../utils/CSVDataLoader';

export class PreviousAyahGenerator extends QuestionGenerator {
    // Static constant for question text
    public static readonly QUESTION_TEXT = 'What is the previous ayah?';

    generate(startPage: number, endPage: number): Question {
        const ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        const randomIndex = Math.floor(Math.random() * (ayahs.length - 1));
        const ayah = ayahs[randomIndex];
        const previousAyah = ayahs[randomIndex - 1];

        const options = [previousAyah, ...this.getRandomOptions(ayahs, previousAyah)];
        const shuffledOptions = this.shuffleArray(options);

        return {
            question: PreviousAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            options: shuffledOptions.map((option) => option.ayahText),
            correct: shuffledOptions.indexOf(previousAyah),
        };
    }

    private getRandomOptions(ayahs: Ayah[], correctAyah: Ayah): Ayah[] {
        const randomAyahs = ayahs.filter((a) => a !== correctAyah);
        return randomAyahs.slice(0, 3); // Select 3 random ayahs
    }

    private shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    public get questionText(): string {
        return PreviousAyahGenerator.QUESTION_TEXT;
    }
}
