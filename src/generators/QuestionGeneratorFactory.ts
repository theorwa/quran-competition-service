import { QuestionType } from '../models/QuestionType';
import { IQuestionGenerator } from './IQuestionGenerator';
import { NextAyahGenerator } from './types/NextAyahGenerator';
import { PreviousAyahGenerator } from './types/PreviousAyahGenerator';
import {SuffixAyahGenerator} from "./types/SuffixAyahGenerator";
import {PageNumberGenerator} from "./types/PageNumberGenerator";
import {AyatPageCountGenerator} from "./types/AyatPageCountGenerator";
import {FirstAyahInPageGenerator} from "./types/FirstAyahInPageGenerator";

export class QuestionGeneratorFactory {
    public static createGenerator(type: string): IQuestionGenerator {
        if (type === 'random') {
            const keys = Object.keys(QuestionType) as Array<keyof typeof QuestionType>;
            type = QuestionType[keys[Math.floor(Math.random() * keys.length)]];
        }
        switch (type) {
            case QuestionType.NextAyah:
                return new NextAyahGenerator();
            case QuestionType.PreviousAyah:
                return new PreviousAyahGenerator();
            case QuestionType.SuffixAyah:
                return new SuffixAyahGenerator();
            case QuestionType.PageNumber:
                return new PageNumberGenerator();
            case QuestionType.AyatPageCount:
                return new AyatPageCountGenerator();
            default:
                return new NextAyahGenerator();
        }
    }
}
