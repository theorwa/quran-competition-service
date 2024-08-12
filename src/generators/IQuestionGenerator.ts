import { Question } from '../models/Question';

export interface IQuestionGenerator {
    generate(startPage: number, endPage: number): Question;
    questionText: string;
}
