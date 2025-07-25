import {CSVDataLoader} from '../utils/CSVDataLoader';
import { Question } from '../models/Question';
import {ISpecification} from "../specifications/ISpecification";
import {Ayah} from "../models/Ayah";
import { QuestionGeneratorConfig } from '../types/QuestionGeneratorConfig';

export abstract class QuestionGenerator {
    protected dataLoader: CSVDataLoader;

    constructor() {
        this.dataLoader = CSVDataLoader.getInstance();
    }

    abstract generate(spec: ISpecification<Ayah>, config?: QuestionGeneratorConfig): Question;

    // Abstract getter for question text
    public abstract get questionText(): string;
}
