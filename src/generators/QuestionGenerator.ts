import { CSVDataLoader } from '../utils/CSVDataLoader';
import { Question } from '../models/Question';

export abstract class QuestionGenerator {
    protected dataLoader: CSVDataLoader;

    constructor() {
        this.dataLoader = CSVDataLoader.getInstance();
    }

    abstract generate(startPage: number, endPage: number): Question;

    // Abstract getter for question text
    public abstract get questionText(): string;
}
