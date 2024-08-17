import {BaseQuestionGenerator} from "../BaseQuestionGenerator";
import {Question} from "../../models/Question";
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class NextWordGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الكلمة التالية؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        const word = filteredAyahs.getWordByIndex(currentIndex);
        const ayah = filteredAyahs.getAyahByWordIndex(currentIndex);
        const nextWord = filteredAyahs.getWordByIndex(currentIndex + 1);
        const nextWords = filteredAyahs.getNextUniqueWords(currentIndex, 4);
        if (!nextWords || nextWords.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        nextWords.push(nextWord);
        const shuffledOptions = this.shuffleArray(nextWords);
        return {
            question: NextWordGenerator.QUESTION_TEXT,
            ayah: word,
            ayahNumber: `${ayah.surahName}:${ayah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === nextWord),
        };
    }

    public get questionText(): string {
        return NextWordGenerator.QUESTION_TEXT;
    }
}