import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class PageNumberGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هو رقم الصفحة؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        const questionAyahIndex = filteredAyahs.getAyahIndex(currentIndex);
        const ayah = filteredAyahs.getAyahByIndex(questionAyahIndex);

        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }

        // The correct page number is the page number of the selected ayah
        const correctPageNumber = ayah.pageNumber;

        // Create a set to store the page number options
        const pageNumbers = new Set<number>();
        pageNumbers.add(correctPageNumber);

        while (pageNumbers.size < 5) {
            const randomOffset = Math.floor(Math.random() * 10) - 5;
            const nearbyPage = correctPageNumber + randomOffset;
            if (nearbyPage > 0 && nearbyPage <= 604 && !pageNumbers.has(nearbyPage)) {
                pageNumbers.add(nearbyPage);
            }
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
