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

        // Calculate the range size
        const rangeSize = endPage - startPage + 1;

        // If the range is less than 5, we'll need to consider pages outside the range
        const pageNumbers = new Set<number>();
        pageNumbers.add(correctPageNumber);

        // First, add all possible pages within the range
        for (let i = startPage; i <= endPage && pageNumbers.size < 5; i++) {
            pageNumbers.add(i);
        }

        // If still less than 5, add nearby pages outside the range
        let offset = 1;
        while (pageNumbers.size < 5 && (startPage - offset >= 1 || endPage + offset <= 604)) {
            if (startPage - offset >= 1) pageNumbers.add(startPage - offset);
            if (endPage + offset <= 604) pageNumbers.add(endPage + offset);
            offset++;
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
