import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';

export class PageStartAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الآية التي تبدأ بها الصفحة؟';

    protected generateQuestion(startPage: number, endPage: number): Question {
        let ayahs = this.expandPageRange(startPage, endPage, 6);

        // Filter ayahs to exclude the first ayah of the surah (surahAyahNumber !== 1)
        const eligibleAyahs = ayahs.filter(a => a.surahAyahNumber !== 1);

        // Select a random ayah from the eligible ayahs
        const randomIndex = Math.floor(Math.random() * eligibleAyahs.length);
        const ayah = eligibleAyahs[randomIndex];

        if (!ayah) {
            throw new Error('Failed to generate a valid question.');
        }

        // Get the first ayah of the page where the selected ayah is located
        const correctPage = ayah.pageNumber;
        const correctAyah = ayahs.find(a => a.pageNumber === correctPage && a.surahAyahNumber === 1);

        if (!correctAyah) {
            throw new Error('Failed to find the first ayah on the correct page.');
        }

        // Generate options: first ayah of 5 different pages within the range
        const pageNumbers = new Set<number>();
        pageNumbers.add(correctPage);

        while (pageNumbers.size < 5) {
            const randomPage = Math.floor(Math.random() * (endPage - startPage + 1)) + startPage;
            pageNumbers.add(randomPage);
        }

        const options = Array.from(pageNumbers).map(pageNumber => {
            const pageStartAyah = ayahs.find(a => a.pageNumber === pageNumber && a.surahAyahNumber === 1);
            return this.formatAyahText(pageStartAyah ? pageStartAyah.ayahText : '');
        });

        // Shuffle options and find the correct index
        const shuffledOptions = this.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(this.formatAyahText(correctAyah.ayahText));

        return {
            question: PageStartAyahGenerator.QUESTION_TEXT,
            ayah: ayah.ayahText,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: correctIndex,
        };
    }

    public get questionText(): string {
        return PageStartAyahGenerator.QUESTION_TEXT;
    }
}
