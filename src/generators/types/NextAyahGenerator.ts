import { QuestionGenerator } from '../QuestionGenerator';
import { Question } from '../../models/Question';
import { Ayah } from '../../utils/CSVDataLoader';

export class NextAyahGenerator extends QuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية التالية؟';

    generate(startPage: number, endPage: number): Question {
        let ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);

        // If not enough ayahs, gradually expand the range
        while (ayahs.length < 2 && (startPage > 1 || endPage < 604)) {
            if (startPage > 1) startPage--;
            if (endPage < 604) endPage++;
            ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        }

        if (ayahs.length < 2) {
            throw new Error('Not enough ayahs in the selected page range to generate a question.');
        }

        const randomIndex = Math.floor(Math.random() * (ayahs.length - 1));
        const ayah = ayahs[randomIndex];
        const nextAyah = ayahs[randomIndex + 1];

        if (!ayah || !nextAyah) {
            throw new Error('Unable to find sufficient ayahs for generating a question.');
        }

        const options = [nextAyah, ...this.getRandomOptions(ayahs, nextAyah)];
        const shuffledOptions = this.shuffleArray(options);

        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            options: shuffledOptions.map((option) => option.ayahText),
            correct: shuffledOptions.indexOf(nextAyah),
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
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
