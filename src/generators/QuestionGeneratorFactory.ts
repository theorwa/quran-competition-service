import { QuestionType } from '../models/QuestionType';
import { IQuestionGenerator } from './IQuestionGenerator';
import { PrefixNextAyahGenerator } from './types/PrefixNextAyahGenerator';
import { PrefixPreviousAyahGenerator } from './types/PrefixPreviousAyahGenerator';
import {SuffixAyahGenerator} from "./types/SuffixAyahGenerator";
import {PageNumberGenerator} from "./types/PageNumberGenerator";
import {AyatPageCountGenerator} from "./types/AyatPageCountGenerator";
import {SuffixPreviousAyahGenerator} from "./types/SuffixPreviousAyahGenerator";
import {NextWordGenerator} from "./types/NextWordGenerator";

export class QuestionGeneratorFactory {
    public static createGenerator(type: string): IQuestionGenerator {
        if (type === 'random') {
            const keys = Object.keys(QuestionType) as Array<keyof typeof QuestionType>;
            for (let i = keys.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [keys[i], keys[j]] = [keys[j], keys[i]];
            }
            type = QuestionType[keys[0]];
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
            case QuestionType.nextWord:
                return new NextWordGenerator();
            default:
                return new PrefixNextAyahGenerator();
        }
    }
}
