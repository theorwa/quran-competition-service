import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import { FilteredAyahs } from '../../models/FilteredAyahs';
import { QuestionGeneratorConfig, getConfigWithDefaults, QURAN_CONSTANTS } from '../../types/QuestionGeneratorConfig';

export class AyatPageCountGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هو عدد الآيات في الصفحة؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, config: Required<QuestionGeneratorConfig>): Question {
        const { currentIndex, choices } = config;
        const ayah = filteredAyahs.getAyahByIndex(currentIndex);
        const correctCount = ayah.pageAyatCount;
        const options = this.generateOptions(correctCount, choices);
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

    private generateOptions(correctCount: number, choices: number): number[] {
        const counts = new Set<number>();
        counts.add(correctCount);

        while (counts.size < choices) {
            const randomNearbyCount = correctCount + Math.floor(Math.random() * QURAN_CONSTANTS.NEARBY_COUNT_RANGE) - QURAN_CONSTANTS.NEARBY_COUNT_CENTER;
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
