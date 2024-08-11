import { Request, Response } from 'express';
import { QuestionService } from '../services/questionService';

const questionService = new QuestionService();

export const getQuestions = (req: Request, res: Response) => {
    const questions = questionService.getQuestions();
};

export const generateQuestion = (req: Request, res: Response) => {
    const question = questionService.generateQuestion();
    res.json(question);
};
