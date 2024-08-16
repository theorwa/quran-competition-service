import { Question } from '../models/Question';
import {ISpecification} from "../specifications/ISpecification";
import {Ayah} from "../utils/CSVDataLoader";

export interface IQuestionGenerator {
    generate(spec: ISpecification<Ayah>, ayahIndex: number | null): Question;
    questionText: string;
}
