import {Ayah, CSVDataLoader} from '../utils/CSVDataLoader';
import { Question } from '../models/Question';
import {ISpecification} from "../specifications/ISpecification";

export abstract class QuestionGenerator {
    protected dataLoader: CSVDataLoader;

    constructor() {
        this.dataLoader = CSVDataLoader.getInstance();
    }

    abstract generate(spec: ISpecification<Ayah>, ayahIndex: number | null): Question;

    // Abstract getter for question text
    public abstract get questionText(): string;
}
