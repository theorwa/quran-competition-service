import {BaseQuestionGenerator} from "../BaseQuestionGenerator";
import {Ayah} from "../../utils/CSVDataLoader";
import {Question} from "../../models/Question";

export class NextWordGenerator extends BaseQuestionGenerator {
    public static readonly QUESTION_TEXT = 'ما هي الكلمة التالية؟';

    protected generateQuestion(filteredAyahs: Ayah[], currentIndex: number | null): Question {
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