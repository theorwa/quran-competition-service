import { Question } from '../models/Question';
import {ISpecification} from "../specifications/ISpecification";
import {Ayah} from "../models/Ayah";
import { QuestionGeneratorConfig } from '../types/QuestionGeneratorConfig';

export interface IQuestionGenerator {
    generate(spec: ISpecification<Ayah>, config?: QuestionGeneratorConfig): Question;
    questionText: string;
}
