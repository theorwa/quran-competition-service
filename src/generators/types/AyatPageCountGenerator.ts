import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import { FilteredAyahs } from '../../models/FilteredAyahs';

export class AyatPageCountGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هو عدد الآيات في الصفحة؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        const ayah = filteredAyahs.getAyahByIndex(currentIndex);
        const correctCount = ayah.pageAyatCount;
        const options = this.generateOptions(correctCount);
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(correctCount);
        return {
            question: AyatPageCountGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions.map(String),
            correct: correctIndex,
        };
    }

    private generateOptions(correctCount: number): number[] {
        const counts = new Set<number>();
        counts.add(correctCount);

        while (counts.size < 5) {
            const randomNearbyCount = correctCount + Math.floor(Math.random() * 5) - 2;
            if (randomNearbyCount > 0) {
                counts.add(randomNearbyCount);
            }
        }

        return Array.from(counts);
    }

    public get questionText(): string {
        return AyatPageCountGenerator.QUESTION_TEXT;
    }
}
