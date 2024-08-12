import { Router } from 'express';
import { QuestionController } from '../controllers/QuestionController';

const router = Router();

router.get('/generate-question', QuestionController.generateQuestion);

export default router;
