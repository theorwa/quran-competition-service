import { BaseQuestionGenerator } from '../BaseQuestionGenerator';
import { Question } from '../../models/Question';
import { FilteredAyahs } from "../../models/FilteredAyahs";
import { SuffixAyahGenerator } from './SuffixAyahGenerator';
import { PrefixNextSuffixAyahGenerator } from "./PrefixNextSuffixAyahGenerator";
import { QuestionGeneratorConfig, getConfigWithDefaults } from '../../types/QuestionGeneratorConfig';

export class SardAyahGenerator extends BaseQuestionGenerator {
    private prefixGenerator = new PrefixNextSuffixAyahGenerator();
    private suffixGenerator = new SuffixAyahGenerator();

    protected generateQuestion(filteredAyahs: FilteredAyahs, config: Required<QuestionGeneratorConfig>): Question {
        const { currentIndex } = config;
        const ayahIndex = Math.floor(currentIndex / 2);
        const isSuffix = currentIndex % 2 === 0;

        if (isSuffix) {
            return this.suffixGenerator.publicGenerateQuestion(filteredAyahs, config);
        } else {
            return this.prefixGenerator.publicGenerateQuestion(filteredAyahs, config);
        }
    }

    public get questionText(): string {
        return 'اختبار السرد';
    }
}
