import {BaseQuestionGenerator} from "../BaseQuestionGenerator";
import {Question} from "../../models/Question";
import {FilteredAyahs} from "../../models/FilteredAyahs";

export class NextWordGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الكلمة التالية؟';

    protected generateQuestion(filteredAyahs: FilteredAyahs, currentIndex: number): Question {
        // empty
        return {
            question: NextWordGenerator.QUESTION_TEXT,
            ayah: '',
            ayahNumber: '',
            options: [],
            correct: 0,
        };
    }

    public get questionText(): string {
        return NextWordGenerator.QUESTION_TEXT;
    }
}