import { Router } from 'express';
import { QuestionController } from '../controllers/QuestionController';
import { validateQuestionQuery, validateSingleQuestionQuery } from '../middlewares/validationMiddleware';

const router = Router();

router.get('/generate-question', validateSingleQuestionQuery, QuestionController.generateQuestion);
router.get('/generate-questions', validateQuestionQuery, QuestionController.generateQuestions);

export default router;
