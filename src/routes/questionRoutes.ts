import express from 'express';
import { getQuestions, generateQuestion } from '../controllers/questionController';

const router = express.Router();

router.get('/questions', getQuestions);
router.get('/questions/generate', generateQuestion);

export default router;
