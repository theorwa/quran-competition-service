import { Router } from 'express';
import { QuestionController } from '../controllers/QuestionController';

const router = Router();

router.get('/generate-question', QuestionController.generateQuestion);
router.get('/generate-questions', QuestionController.generateQuestions);

export default router;
