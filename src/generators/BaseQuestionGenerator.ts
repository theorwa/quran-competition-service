import { QuestionGenerator } from './QuestionGenerator';
import { Ayah } from '../utils/CSVDataLoader';
import { Question } from '../models/Question';

export abstract class BaseQuestionGenerator extends QuestionGenerator {

    private static readonly MAX_RETRIES = 3;

    protected abstract generateQuestion(startPage: number, endPage: number): Question;

    public generate(startPage: number, endPage: number): Question {
        let attempts = 0;
        let question: Question | null = null;

        while (attempts < BaseQuestionGenerator.MAX_RETRIES && !question) {
            try {
                question = this.generateQuestion(startPage, endPage);
            } catch (error) {
                attempts++;
                if (attempts >= BaseQuestionGenerator.MAX_RETRIES) {
                    throw new Error('Failed to generate a question after multiple attempts.');
                }
            }
        }

        return question!;
    }

    protected shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    protected getRandomOptions(allAyahs: Ayah[], exclude: Ayah[], count: number): Ayah[] {
        const availableAyahs = allAyahs.filter((a) => !exclude.includes(a));
        const randomOptions = [];

        while (randomOptions.length < count && availableAyahs.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableAyahs.length);
            randomOptions.push(availableAyahs.splice(randomIndex, 1)[0]);
        }

        return randomOptions;
    }

    protected expandPageRange(startPage: number, endPage: number, minAyahs: number): Ayah[] {
        let ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);

        while (ayahs.length < minAyahs && (startPage > 1 || endPage < 604)) {
            if (startPage > 1) startPage--;
            if (endPage < 604) endPage++;
            ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        }

        return ayahs;
    }

    protected getNextAyah(ayahs: Ayah[], randomIndex: number): number {
        return (randomIndex + 1) % ayahs.length;
    }

    protected getPreviousAyah(ayahs: Ayah[], randomIndex: number): number {
        return (randomIndex - 1 + ayahs.length) % ayahs.length;
    }

    protected getNextAyahs(ayahs: Ayah[], randomIndex: number, count: number): Ayah[] {
        const nextAyahs = [];
        for (let i = 1; i <= count; i++) {
            nextAyahs.push(ayahs[this.getNextAyah(ayahs, randomIndex + i)]);
        }
        return nextAyahs;
    }

    protected getPreviousAyahs(ayahs: Ayah[], randomIndex: number, count: number): Ayah[] {
        const previousAyahs = [];
        for (let i = 1; i <= count; i++) {
            previousAyahs.push(ayahs[this.getPreviousAyah(ayahs, randomIndex - i)]);
        }
        return previousAyahs;
    }

    protected getNextUniqueAyaPrefixes(ayahs: Ayah[], randomIndex: number, count: number): string[] {
        const uniqueAyaPrefixes: string[] = [];
        let currentIndex = randomIndex;
        while (uniqueAyaPrefixes.length < count) {
            const nextIndex = this.getNextAyah(ayahs, currentIndex);
            if (!uniqueAyaPrefixes.includes(ayahs[nextIndex].prefix)) {
                uniqueAyaPrefixes.push(ayahs[nextIndex].prefix);
            }
            currentIndex = nextIndex;
        }
        return uniqueAyaPrefixes;
    }

    protected getPreviousUniqueAyaPrefixes(ayahs: Ayah[], randomIndex: number, count: number): string[] {
        const uniqueAyaPrefixes: string[] = [];
        let currentIndex = randomIndex;
        while (uniqueAyaPrefixes.length < count) {
            const previousIndex = this.getPreviousAyah(ayahs, currentIndex);
            if (!uniqueAyaPrefixes.includes(ayahs[previousIndex].prefix)) {
                uniqueAyaPrefixes.push(ayahs[previousIndex].prefix);
            }
            currentIndex = previousIndex;
        }
        return uniqueAyaPrefixes;
    }

    protected getNextUniqueAyaSuffixes(ayahs: Ayah[], randomIndex: number, count: number): string[] {
        const uniqueAyaSuffixes: string[] = [];
        let currentIndex = randomIndex;
        while (uniqueAyaSuffixes.length < count) {
            const nextIndex = this.getNextAyah(ayahs, currentIndex);
            if (!uniqueAyaSuffixes.includes(ayahs[nextIndex].suffix)) {
                uniqueAyaSuffixes.push(ayahs[nextIndex].suffix);
            }
            currentIndex = nextIndex;
        }
        return uniqueAyaSuffixes;
    }

    protected getPreviousUniqueAyaSuffixes(ayahs: Ayah[], randomIndex: number, count: number): string[] {
        const uniqueAyaSuffixes: string[] = [];
        let currentIndex = randomIndex;
        while (uniqueAyaSuffixes.length < count) {
            const previousIndex = this.getPreviousAyah(ayahs, currentIndex);
            if (!uniqueAyaSuffixes.includes(ayahs[previousIndex].suffix)) {
                uniqueAyaSuffixes.push(ayahs[previousIndex].suffix);
            }
            currentIndex = previousIndex;
        }
        return uniqueAyaSuffixes;
    }
}
