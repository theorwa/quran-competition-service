import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { QuestionType } from '../models/QuestionType';
import { QURAN_CONSTANTS } from '../types/QuestionGeneratorConfig';
import { DifficultyLevel } from '../types/DifficultyLevel';

// Simple validation schemas
const questionQuerySchema = Joi.object({
  question_type: Joi.string().valid(...Object.values(QuestionType)).optional(),
  num_questions: Joi.number().integer().min(1).max(50).optional(),
  choices: Joi.number().integer().min(QURAN_CONSTANTS.MIN_CHOICES).max(QURAN_CONSTANTS.MAX_CHOICES).optional(),
  sequence: Joi.boolean().optional(),
  index: Joi.number().integer().min(-1).optional(),
  start_page: Joi.number().integer().min(1).max(QURAN_CONSTANTS.TOTAL_PAGES).optional(),
  end_page: Joi.number().integer().min(1).max(QURAN_CONSTANTS.TOTAL_PAGES).optional(),
  pages: Joi.string().pattern(/^(\d+(-\d+)?)(,\d+(-\d+)?)*$/).optional(),
  surah: Joi.string().pattern(/^\d+(,\d+)*$/).optional(),
  juz: Joi.string().pattern(/^\d+(,\d+)*$/).optional(),
  hizb: Joi.string().pattern(/^\d+(,\d+)*$/).optional(),
  difficulty_level: Joi.string().valid(...Object.values(DifficultyLevel)).optional()
});

const singleQuestionQuerySchema = Joi.object({
  question_type: Joi.string().valid(...Object.values(QuestionType)).optional(),
  choices: Joi.number().integer().min(QURAN_CONSTANTS.MIN_CHOICES).max(QURAN_CONSTANTS.MAX_CHOICES).optional(),
  index: Joi.number().integer().min(-1).optional(),
  start_page: Joi.number().integer().min(1).max(QURAN_CONSTANTS.TOTAL_PAGES).optional(),
  end_page: Joi.number().integer().min(1).max(QURAN_CONSTANTS.TOTAL_PAGES).optional(),
  pages: Joi.string().pattern(/^(\d+(-\d+)?)(,\d+(-\d+)?)*$/).optional(),
  surah: Joi.string().pattern(/^\d+(,\d+)*$/).optional(),
  juz: Joi.string().pattern(/^\d+(,\d+)*$/).optional(),
  hizb: Joi.string().pattern(/^\d+(,\d+)*$/).optional(),
  difficulty_level: Joi.string().valid(...Object.values(DifficultyLevel)).optional()
});

// Simple validation middleware factory
const createValidationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);
    
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

// Export validation middlewares
export const validateQuestionQuery = createValidationMiddleware(questionQuerySchema);
export const validateSingleQuestionQuery = createValidationMiddleware(singleQuestionQuerySchema); 