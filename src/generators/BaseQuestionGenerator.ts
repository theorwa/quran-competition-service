import { QuestionGenerator } from './QuestionGenerator';
import { Question } from '../models/Question';
import {ISpecification} from "../specifications/ISpecification";
import {FilteredAyahs} from "../models/FilteredAyahs";
import {Ayah} from "../models/Ayah";
import { QuestionGeneratorConfig, getConfigWithDefaults, QURAN_CONSTANTS } from '../types/QuestionGeneratorConfig';

export abstract class BaseQuestionGenerator extends QuestionGenerator {

    private static readonly MAX_RETRIES = 3;

    protected abstract generateQuestion(filteredAyahs: FilteredAyahs, config: Required<QuestionGeneratorConfig>): Question;

    public generate(spec: ISpecification<Ayah>, config: QuestionGeneratorConfig = {}): Question {
        // Get configuration with defaults
        const defaultConfig = getConfigWithDefaults(config);

        let attempts = 0;
        let question: Question | null = null;
        const filteredAyahs: FilteredAyahs = new FilteredAyahs(this.dataLoader.getFilteredAyahs(spec));
        while (attempts < BaseQuestionGenerator.MAX_RETRIES && !question) {
            try {
                question = this.generateQuestion(filteredAyahs, defaultConfig);
            } catch (error) {
                attempts++;
                if (attempts >= BaseQuestionGenerator.MAX_RETRIES) {
                    throw new Error('Failed to generate a question after multiple attempts.');
                }
            }
        }

        return question!;
    }

    protected shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    protected expandPageRange(startPage: number, endPage: number, minAyahs: number): Ayah[] {
        let ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);

        while (ayahs.length < minAyahs && (startPage > 1 || endPage < QURAN_CONSTANTS.TOTAL_PAGES)) {
            if (startPage > 1) startPage--;
            if (endPage < QURAN_CONSTANTS.TOTAL_PAGES) endPage++;
            ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        }

        return ayahs;
    }
}
