import { QuestionType } from '../models/QuestionType';
import { IQuestionGenerator } from './IQuestionGenerator';
import { NextAyahGenerator } from './types/NextAyahGenerator';
import { PreviousAyahGenerator } from './types/PreviousAyahGenerator';
import {SuffixAyahGenerator} from "./types/SuffixAyahGenerator";

export class QuestionGeneratorFactory {
    public static createGenerator(type: string): IQuestionGenerator {
        switch (type) {
            case QuestionType.NextAyah:
                return new NextAyahGenerator();
            case QuestionType.PreviousAyah:
                return new PreviousAyahGenerator();
            case QuestionType.SuffixAyah:
                return new SuffixAyahGenerator();
            default:
                return new NextAyahGenerator();
        }
    }
}
