import { QuestionType } from '../models/QuestionType';
import { IQuestionGenerator } from './IQuestionGenerator';
import { NextAyahGenerator } from './types/NextAyahGenerator';
import { PreviousAyahGenerator } from './types/PreviousAyahGenerator';

export class QuestionGeneratorFactory {
    public static createGenerator(type: string): IQuestionGenerator {
        switch (type) {
            case QuestionType.NextAyah:
                return new NextAyahGenerator();
            case QuestionType.PreviousAyah:
                return new PreviousAyahGenerator();
            // Add more cases for additional question types
            default:
                throw new Error(`Invalid question type: ${type}`);
        }
    }
}
