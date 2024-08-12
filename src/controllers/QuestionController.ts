import { Request, Response } from 'express';
import { QuestionGeneratorFactory } from '../generators/QuestionGeneratorFactory';
import { QuestionType } from '../models/QuestionType';

export class QuestionController {
    public static generateQuestion(req: Request, res: Response): void {
        const questionType: string = (req.query.question_type as string) || QuestionType.NextAyah;
        const startPage: number = Number(req.query.start_page) || 1;
        const endPage: number = Number(req.query.end_page) || 604;
        if (startPage > endPage) {
            [startPage, endPage] = [endPage, startPage];
        }

        try {
            const generator = QuestionGeneratorFactory.createGenerator(questionType);
            const question = generator.generate(startPage, endPage);
            res.json(question);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
}
