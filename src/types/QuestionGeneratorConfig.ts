import { DifficultyLevel } from './DifficultyLevel';

// Constants for commonly used values
export const QURAN_CONSTANTS = {
    TOTAL_PAGES: 604,
    MIN_CHOICES: 2,
    MAX_CHOICES: 10,
    RANDOM_OFFSET_RANGE: 10,
    RANDOM_OFFSET_CENTER: 5,
    NEARBY_COUNT_RANGE: 5,
    NEARBY_COUNT_CENTER: 2
} as const;

// Default values for configuration
export const DEFAULT_CONFIG = {
    currentIndex: -1,
    choices: 5,
    difficulty: DifficultyLevel.EASY
} as const;

export interface QuestionGeneratorConfig {
    currentIndex?: number;
    choices?: number;
    difficulty?: DifficultyLevel;
    // Future parameters can be easily added here
    // language?: 'ar' | 'en';
    // timeLimit?: number;
    // hints?: boolean;
}

// Utility function to get configuration with defaults
export function getConfigWithDefaults(config: QuestionGeneratorConfig = {}): Required<QuestionGeneratorConfig> {
    return {
        currentIndex: config.currentIndex ?? DEFAULT_CONFIG.currentIndex,
        choices: config.choices ?? DEFAULT_CONFIG.choices,
        difficulty: config.difficulty ?? DEFAULT_CONFIG.difficulty
    };
}

// Re-export DifficultyLevel for convenience
export { DifficultyLevel }; 