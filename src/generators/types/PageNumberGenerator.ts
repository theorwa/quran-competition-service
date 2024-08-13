import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class PageNumberGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هو رقم الصفحة؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        // Select a random ayah from the range
        const randomIndex = Math.floor(Math.random() * ayahs.length);
        const ayah = ayahs[randomIndex];

        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }

        // The correct page number is the page number of the selected ayah
        const correctPageNumber = ayah.pageNumber;

        // Generate four other random page numbers as distractors
        const pageNumbers = new Set<number>();
        pageNumbers.add(correctPageNumber);

        while (pageNumbers.size < 5) {
            const randomPage = Math.floor(Math.random() * 604) + 1; // Quran has 604 pages
            pageNumbers.add(randomPage);
        }

        const options = Array.from(pageNumbers);

        // Shuffle options and find the correct index
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(correctPageNumber);

        return {
            question: PageNumberGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map(String), // Convert numbers to strings for the response
            correct: correctIndex,
        };
    }

    public get questionText(): string {
        return PageNumberGenerator.QUESTION_TEXT;
    }
}
