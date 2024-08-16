import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class FirstAyahInPageGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية التي تبدأ بها الصفحة؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        // Filter out any ayah that is the first in its surah
        const filteredAyahs = ayahs.filter(a => a.surahAyahNumber !== 1);

        if (filteredAyahs.length === 0) {
            throw new Error('No valid ayahs found within the specified range.');
        }

        // Select a random ayah from the filtered list
        const randomIndex = Math.floor(Math.random() * filteredAyahs.length);
        const ayah = filteredAyahs[randomIndex];

        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }

        // Find the first ayah of the page where the random ayah is located
        const correctFirstAyah = ayahs.find(a => a.pageNumber === ayah.pageNumber && a.surahAyahNumber === 1);

        if (!correctFirstAyah) {
            throw new Error('Failed to find the first ayah of the correct page.');
        }

        // Generate the first ayahs of 4 other pages within the range
        const firstAyahs = new Set<string>();
        firstAyahs.add(correctFirstAyah.prefix);

        while (firstAyahs.size < 5) {
            const randomPage = Math.floor(Math.random() * (endPage - startPage + 1)) + startPage;
            const firstAyahOfPage = ayahs.find(a => a.pageNumber === randomPage && a.surahAyahNumber === 1);
            if (firstAyahOfPage) {
                firstAyahs.add(correctFirstAyah.prefix);
            }

            // To avoid infinite loop, if we've exhausted all possibilities within the range, break out
            if (firstAyahs.size < 5 && firstAyahs.size === ayahs.filter(a => a.surahAyahNumber === 1).length) {
                break;
            }
        }

        const options = Array.from(firstAyahs);

        // Shuffle options and find the correct index
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(correctFirstAyah.prefix);

        return {
            question: FirstAyahInPageGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: correctIndex,
        };
    }

    public get questionText(): string {
        return FirstAyahInPageGenerator.QUESTION_TEXT;
    }
}
