import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import { Ayah } from '../../utils/CSVDataLoader';

export class AyatPageCountGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هو عدد الآيات في الصفحة؟';

    protected generateQuestion(filteredAyahs: Ayah[], ayahIndex: number | null): Question {
        const randomIndex = ayahIndex !== null ? ayahIndex : Math.floor(Math.random() * filteredAyahs.length);
        const ayah = filteredAyahs[randomIndex];

        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }

        // Get the correct count of ayat on the page where the random ayah is located
        const correctCount = filteredAyahs.filter(a => a.pageNumber === ayah.pageNumber).length;

        // Generate four other numbers as distractors
        const counts = new Set<number>();
        counts.add(correctCount);

        while (counts.size < 5) {
            // Generate nearby counts, with some variability but ensuring legitimacy
            const randomNearbyCount = correctCount + Math.floor(Math.random() * 5) - 2; // +/- 2 range
            if (randomNearbyCount > 0) {
                counts.add(randomNearbyCount);
            }
        }

        const options = Array.from(counts);

        // Shuffle options and find the correct index
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(correctCount);

        return {
            question: AyatPageCountGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map(String), // Convert numbers to strings for the response
            correct: correctIndex,
        };
    }

    public get questionText(): string {
        return AyatPageCountGenerator.QUESTION_TEXT;
    }
}
