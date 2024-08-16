import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {Ayah} from "../../utils/CSVDataLoader";

export class NextAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية التالية؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const ayah = ayahs[randomIndex];
        let nextAyahs = ayahs.slice(randomIndex + 1, randomIndex + 15);

        let options: Ayah[] = [];

        while (options.length < 5) {
            if (nextAyahs.length === 0) {
                const randomIndex = Math.floor(Math.random() * ayahs.length);
                const randomAyah = ayahs[randomIndex];
                const formattedAyah = this.formatAyahText(randomAyah.ayahText);
                if (options.findIndex(option => option.ayahText === formattedAyah) === -1) {
                    options.push(randomAyah);
                }
            } else {
                const nextAyah = nextAyahs.shift();
                if (nextAyah) {
                    const formattedAyah = this.formatAyahText(nextAyah.ayahText);
                    if (options.findIndex(option => option.ayahText === formattedAyah) === -1) {
                        options.push(nextAyah);
                    }
                }
            }
        }

        const shuffledOptions = this.shuffleArray(options);

        const correctAyah = ayahs[randomIndex + 1];

        return {
            question: NextAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map((option) => this.formatAyahText(option.ayahText)),
            correct: shuffledOptions.findIndex(option => option === correctAyah),
        };
    }

    public get questionText(): string {
        return NextAyahGenerator.QUESTION_TEXT;
    }
}
