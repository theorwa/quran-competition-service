import { Question } from '../models/question';
import { parseCSV } from '../utils/csvParser';
import { config } from '../config';

export class QuestionService {
    private questions: Question[] = [];

    constructor() {
        this.loadQuestions();
    }

    private async loadQuestions() {
        this.questions = await parseCSV(config.csvFilePath);
    }

    public getQuestions(): Question[] {
        return this.questions;
    }

    public generateQuestion(): Question {
        // Logic to generate a question from the CSV data
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    }
}
