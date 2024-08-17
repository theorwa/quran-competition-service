import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class PrefixNextAyahGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي بداية الآية التالية؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        const questionAyahIndex = filteredAyahs.getAyahIndex(currentIndex);
        const questionAyah = filteredAyahs.getAyahByIndex(questionAyahIndex);
        const nextIndex = filteredAyahs.getNextAyah(questionAyahIndex);
        const nextPrefixes = filteredAyahs.getNextUniqueAyaPrefixes(nextIndex, 4);
        if (!nextPrefixes || nextPrefixes.length < 4) {
            throw new Error('Failed to generate a valid question.');
        }
        const correctOption = filteredAyahs.getAyahByIndex(nextIndex).getPrefix();
        nextPrefixes.push(filteredAyahs.getAyahByIndex(nextIndex).getPrefix());
        const shuffledOptions = this.shuffleArray(nextPrefixes);
        return {
            question: PrefixNextAyahGenerator.QUESTION_TEXT,
            ayah: questionAyah.ayahText,
            ayahNumber: `${questionAyah.surahName}:${questionAyah.surahAyahNumber}`,
            options: shuffledOptions,
            correct: shuffledOptions.findIndex(option => option === correctOption),
        };

    }

    public get questionText(): string {
        return PrefixNextAyahGenerator.QUESTION_TEXT;
    }
}
