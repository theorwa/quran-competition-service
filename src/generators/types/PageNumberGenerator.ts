import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";
import { QuestionGeneratorConfig, getConfigWithDefaults, QURAN_CONSTANTS } from '../../types/QuestionGeneratorConfig';

export class PageNumberGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هو رقم الصفحة؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, config: Required<QuestionGeneratorConfig>): Question {
        const { currentIndex, choices } = config;
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

        while (pageNumbers.size < choices) {
            const randomOffset = Math.floor(Math.random() * QURAN_CONSTANTS.RANDOM_OFFSET_RANGE) - QURAN_CONSTANTS.RANDOM_OFFSET_CENTER;
            const nearbyPage = correctPageNumber + randomOffset;
            if (nearbyPage > 0 && nearbyPage <= QURAN_CONSTANTS.TOTAL_PAGES && !pageNumbers.has(nearbyPage)) {
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
