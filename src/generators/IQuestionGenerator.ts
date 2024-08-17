import { Question } from '../models/Question';
import {ISpecification} from "../specifications/ISpecification";
import {Ayah} from "../models/Ayah";

export interface IQuestionGenerator {
    generate(spec: ISpecification<Ayah>, currentIndex: number): Question;
    questionText: string;
}
