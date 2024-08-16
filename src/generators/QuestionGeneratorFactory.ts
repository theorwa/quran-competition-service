import { QuestionType } from '../models/QuestionType';
import { IQuestionGenerator } from './IQuestionGenerator';
import { PrefixNextAyahGenerator } from './types/PrefixNextAyahGenerator';
import { PrefixPreviousAyahGenerator } from './types/PrefixPreviousAyahGenerator';
import {SuffixAyahGenerator} from "./types/SuffixAyahGenerator";
import {PageNumberGenerator} from "./types/PageNumberGenerator";
import {AyatPageCountGenerator} from "./types/AyatPageCountGenerator";
import {FirstAyahInPageGenerator} from "./types/FirstAyahInPageGenerator";
import {SuffixPreviousAyahGenerator} from "./types/SuffixPreviousAyahGenerator";

export class QuestionGeneratorFactory {
    public static createGenerator(type: string): IQuestionGenerator {
        if (type === 'random') {
            const keys = Object.keys(QuestionType) as Array<keyof typeof QuestionType>;
            type = QuestionType[keys[Math.floor(Math.random() * keys.length)]];
        }
        switch (type) {
            case QuestionType.PrefixNextAyah:
                return new PrefixNextAyahGenerator();
            case QuestionType.PrefixPreviousAyah:
                return new PrefixPreviousAyahGenerator();
            case QuestionType.SuffixAyah:
                return new SuffixAyahGenerator();
            case QuestionType.PageNumber:
                return new PageNumberGenerator();
            case QuestionType.AyatPageCount:
                return new AyatPageCountGenerator();
            case QuestionType.SuffixPreviousAyah:
                return new SuffixPreviousAyahGenerator();
            default:
                return new PrefixNextAyahGenerator();
        }
    }
}
