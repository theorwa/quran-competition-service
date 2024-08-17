import {CSVDataLoader} from '../utils/CSVDataLoader';
import { Question } from '../models/Question';
import {ISpecification} from "../specifications/ISpecification";
import {Ayah} from "../models/Ayah";

export abstract class QuestionGenerator {
    protected dataLoader: CSVDataLoader;

    constructor() {
        this.dataLoader = CSVDataLoader.getInstance();
    }

    abstract generate(spec: ISpecification<Ayah>, currentIndex: number): Question;

    // Abstract getter for question text
    public abstract get questionText(): string;
}
