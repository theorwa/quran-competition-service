import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class SuffixAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي خاتمة الآية؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        const randomIndex = Math.floor(Math.random() * Math.max(ayahs.length - 1, 1));
        const ayah = ayahs[randomIndex];

        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }

        // Get the first 4 words of the ayah (or the entire ayah if it's 4 words or less)
        const ayahWords = ayah.ayahText.split(' ');
        const firstPart = ayahWords.length > 4 ? ayahWords.slice(0, 4).join(' ') + ' ...' : ayah.ayahText;

        // Get the suffix (last 4 words or the entire ayah if it's 4 words or less)
        const correctSuffix = ayahWords.length > 4 ? ayahWords.slice(-4).join(' ') : ayah.ayahText;

        // Get suffixes of the next 4 ayahs
        let suffixOptions = ayahs.slice(randomIndex + 1, randomIndex + 6).map(a => {
            const words = a.ayahText.split(' ');
            return words.length > 4 ? words.slice(-4).join(' ') : a.ayahText;
        });

        // If there are less than 4 options, fill the remaining with random suffixes
        if (suffixOptions.length < 4) {
            const additionalOptions = this.getRandomOptions(ayahs, ayahs.slice(randomIndex + 1, randomIndex + 6), 4 - suffixOptions.length).map(a => {
                const words = a.ayahText.split(' ');
                return words.length > 4 ? words.slice(-4).join(' ') : a.ayahText;
            });
            suffixOptions = suffixOptions.concat(additionalOptions);
        }

        // Add the correct suffix to the options and shuffle
        const options = this.shuffleArray([correctSuffix, ...suffixOptions]);

        return {
            question: SuffixAyahGenerator.QUESTION_TEXT,
            ayah: firstPart,
            options: options,
            correct: options.findIndex(option => option === correctSuffix),
        };
    }

    public get questionText(): string {
        return SuffixAyahGenerator.QUESTION_TEXT;
    }
}
