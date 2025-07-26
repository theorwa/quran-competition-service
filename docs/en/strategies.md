# Learning Strategies

## Overview

The Quran Competition Service employs various educational strategies to optimize learning outcomes. These strategies are implemented by both the Question Engine and Personalization Engine to create an effective learning experience.

## 🎯 Core Strategies

### 1. Distraction Strategy
**Purpose**: Build effective questions by including strategically designed distracting options

#### Implementation:
- **Logical Distractors**: Create wrong answers that are plausible but incorrect
- **Common Misconceptions**: Use typical mistakes as distraction options
- **Partial Truths**: Include answers that are partially correct but not fully accurate
- **Semantic Similarity**: Use words or concepts that sound similar but have different meanings

#### Specific Algorithms:

##### Semantic Similarity Algorithm
Uses word embeddings and semantic analysis to find similar but incorrect answers.

```javascript
// Semantic Similarity Algorithm
function semanticSimilarityDistractor(correctAnswer, context, wordEmbeddings) {
  const correctVector = wordEmbeddings.getVector(correctAnswer);
  const similarWords = wordEmbeddings.findSimilar(correctVector, 10);
  
  // Filter out exact matches and select plausible distractors
  return similarWords
    .filter(word => word.similarity > 0.7 && word.similarity < 0.95)
    .filter(word => isPlausibleInContext(word.text, context))
    .slice(0, 3);
}

function isPlausibleInContext(word, context) {
  // Check if word fits grammatically and semantically in context
  return checkGrammar(word, context) && checkSemantics(word, context);
}
```

##### Common Misconception Algorithm
Uses learning analytics to identify and reuse common mistakes.

```javascript
// Common Misconception Algorithm
function commonMisconceptionDistractor(questionType, topic, learningAnalytics) {
  const misconceptions = learningAnalytics.getCommonMistakes(questionType, topic);
  const recentMistakes = misconceptions.filter(m => m.frequency > 0.1);
  
  return recentMistakes
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 2)
    .map(m => m.answer);
}
```

##### Partial Truth Algorithm
Creates answers that are partially correct to test deeper understanding.

```javascript
// Partial Truth Algorithm
function partialTruthDistractor(correctAnswer, context) {
  const partialAnswers = [];
  
  // Create answer with missing part
  const words = correctAnswer.split(' ');
  if (words.length > 2) {
    const missingWord = words[Math.floor(words.length / 2)];
    const partialAnswer = words.filter(w => w !== missingWord).join(' ');
    partialAnswers.push(partialAnswer);
  }
  
  // Create answer with extra word
  const extraWord = getRelatedWord(correctAnswer, context);
  const extraAnswer = correctAnswer + ' ' + extraWord;
  partialAnswers.push(extraAnswer);
  
  return partialAnswers;
}
```

##### Logical Alternative Algorithm
Generates logically plausible but incorrect answers based on context.

```javascript
// Logical Alternative Algorithm
function logicalAlternativeDistractor(correctAnswer, context, knowledgeBase) {
  const alternatives = [];
  
  // Find related concepts that could be confused
  const relatedConcepts = knowledgeBase.getRelatedConcepts(correctAnswer);
  
  // Generate alternatives based on common logical errors
  relatedConcepts.forEach(concept => {
    if (isLogicalAlternative(concept, correctAnswer, context)) {
      alternatives.push(concept);
    }
  });
  
  return alternatives.slice(0, 2);
}

function isLogicalAlternative(concept, correctAnswer, context) {
  // Check if concept is logically related but incorrect
  return concept.category === correctAnswer.category && 
         concept !== correctAnswer &&
         concept.relevance > 0.6;
}
```

#### Benefits:
- **Critical Thinking**: Forces users to think carefully about each option
- **Deep Understanding**: Helps users distinguish between similar concepts
- **Error Prevention**: Reduces common mistakes through exposure
- **Knowledge Retention**: Improves memory through active discrimination

#### Technical Implementation:
```javascript
// Example: Distraction Strategy Algorithm
function generateDistractors(correctAnswer, context) {
  return [
    createSemanticDistractor(correctAnswer),
    createCommonMisconception(context),
    createPartialTruth(correctAnswer),
    createLogicalAlternative(context)
  ];
}

// Specific Distraction Algorithms:
function createSemanticDistractor(correctAnswer) {
  // Find words with similar meanings but different contexts
  return findSemanticSimilar(correctAnswer);
}

function createCommonMisconception(context) {
  // Use typical mistakes from learning analytics
  return getCommonMistakes(context);
}

function createPartialTruth(correctAnswer) {
  // Create answers that are partially correct
  return generatePartialAnswer(correctAnswer);
}

function createLogicalAlternative(context) {
  // Generate logically plausible but incorrect answers
  return generateLogicalWrongAnswer(context);
}
```

### 2. Study Strategy (Spaced Repetition)
**Purpose**: Optimize learning through scientifically proven spaced repetition techniques

#### Implementation:
- **Spaced Intervals**: Present questions at increasing time intervals
- **Difficulty-Based Scheduling**: Adjust intervals based on question difficulty
- **Performance Tracking**: Monitor user performance to optimize timing
- **Adaptive Scheduling**: Dynamically adjust intervals based on user progress

#### Specific Algorithms:

##### SM-2 Algorithm (SuperMemo 2)
The SM-2 algorithm is a widely-used spaced repetition algorithm that calculates optimal intervals based on user performance.

**Key Parameters:**
- **E-Factor (EF)**: Represents how difficult an item is (starts at 2.5)
- **Repetition Count**: Number of successful repetitions
- **Quality**: User's self-assessment of recall quality (0-5 scale)
- **Interval**: Days until next review

**Algorithm Logic:**
```javascript
// SM-2 Algorithm Implementation
function sm2Algorithm(quality, repetition, ef, interval) {
  if (quality >= 3) {
    // Successful recall
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ef);
    }
    repetition++;
    ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  } else {
    // Failed recall
    repetition = 0;
    interval = 1;
    ef = Math.max(1.3, ef - 0.2);
  }
  
  return { interval, repetition, ef };
}
```

##### Leitner System
A card-based spaced repetition system using multiple boxes with increasing intervals.

**Box Structure:**
- **Box 1**: Daily review
- **Box 2**: Every 2 days
- **Box 3**: Every 4 days
- **Box 4**: Every 8 days
- **Box 5**: Every 16 days

**Algorithm Logic:**
```javascript
// Leitner System Implementation
function leitnerSystem(card, isCorrect) {
  if (isCorrect) {
    // Move to next box
    card.box = Math.min(card.box + 1, 5);
  } else {
    // Move back to first box
    card.box = 1;
  }
  
  // Calculate next review date
  const intervals = [1, 2, 4, 8, 16];
  card.nextReview = Date.now() + (intervals[card.box - 1] * 24 * 60 * 60 * 1000);
  
  return card;
}
```

##### Anki Algorithm
A modern spaced repetition algorithm that combines SM-2 with additional features.

**Key Features:**
- **Graduating Interval**: Initial interval after successful learning
- **Easy Interval**: Interval for "easy" responses
- **Interval Modifier**: Global adjustment factor
- **Maximum Interval**: Cap on maximum interval length

**Algorithm Logic:**
```javascript
// Anki Algorithm Implementation
function ankiAlgorithm(card, ease, interval) {
  const graduatingInterval = 1;
  const easyInterval = 4;
  const intervalModifier = 1.0;
  const maxInterval = 36500; // 100 years
  
  if (card.repetitions === 0) {
    // New card
    if (ease === 'again') {
      card.interval = 0;
    } else if (ease === 'hard') {
      card.interval = graduatingInterval * 1.2;
    } else if (ease === 'good') {
      card.interval = graduatingInterval;
    } else if (ease === 'easy') {
      card.interval = easyInterval;
    }
  } else {
    // Review card
    if (ease === 'again') {
      card.interval = Math.max(1, card.interval * 0.5);
    } else if (ease === 'hard') {
      card.interval = Math.max(1, card.interval * 1.2);
    } else if (ease === 'good') {
      card.interval = Math.max(1, card.interval * 2.5);
    } else if (ease === 'easy') {
      card.interval = Math.max(1, card.interval * 2.5 * 1.3);
    }
  }
  
  card.interval = Math.min(card.interval * intervalModifier, maxInterval);
  return card;
}
```

#### Benefits:
- **Long-term Retention**: Improves memory retention over time
- **Efficient Learning**: Reduces study time while improving results
- **Personalized Pacing**: Adapts to individual learning speed
- **Prevents Forgetting**: Combats the natural forgetting curve

#### Technical Implementation:
```javascript
// Example: Spaced Repetition Algorithm
function calculateNextReview(question, userPerformance) {
  const difficulty = question.difficulty;
  const performance = userPerformance.score;
  const lastReview = userPerformance.lastReview;
  
  return spacedRepetitionFormula(difficulty, performance, lastReview);
}

// Specific Spaced Repetition Algorithms:
function spacedRepetitionFormula(difficulty, performance, lastReview) {
  const baseInterval = getBaseInterval(difficulty);
  const performanceMultiplier = getPerformanceMultiplier(performance);
  const timeSinceLastReview = Date.now() - lastReview;
  
  return baseInterval * performanceMultiplier * timeSinceLastReview;
}

function getBaseInterval(difficulty) {
  const intervals = {
    'easy': 24 * 60 * 60 * 1000,    // 1 day
    'medium': 3 * 24 * 60 * 60 * 1000,  // 3 days
    'hard': 7 * 24 * 60 * 60 * 1000     // 1 week
  };
  return intervals[difficulty] || intervals['medium'];
}

function getPerformanceMultiplier(performance) {
  if (performance >= 0.8) return 2.0;  // Double interval for good performance
  if (performance >= 0.6) return 1.5;  // Increase interval
  if (performance >= 0.4) return 1.0;  // Keep same interval
  return 0.5;  // Reduce interval for poor performance
}
```

### 3. Adaptive Difficulty Strategy
**Purpose**: Dynamically adjust question difficulty based on user performance

#### Implementation:
- **Performance Analysis**: Continuously analyze user performance patterns
- **Difficulty Adjustment**: Increase or decrease difficulty based on success rate
- **Zone of Proximal Development**: Keep questions in the optimal learning zone
- **Confidence Building**: Gradually increase difficulty to build confidence

#### Specific Algorithms:

##### Item Response Theory (IRT) Algorithm
Uses IRT to estimate user ability and item difficulty for optimal question selection.

```javascript
// IRT Algorithm Implementation
function irtAlgorithm(userAbility, itemDifficulty, discrimination, guessing) {
  // Three-parameter IRT model
  const a = discrimination;
  const b = itemDifficulty;
  const c = guessing;
  const theta = userAbility;
  
  // Probability of correct response
  const p = c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
  
  return p;
}

function estimateUserAbility(responses, itemParameters) {
  // Maximum likelihood estimation of user ability
  let theta = 0;
  const maxIterations = 20;
  
  for (let i = 0; i < maxIterations; i++) {
    const gradient = calculateGradient(responses, itemParameters, theta);
    const hessian = calculateHessian(responses, itemParameters, theta);
    theta = theta - gradient / hessian;
  }
  
  return theta;
}
```

##### Elo Rating System
Adapts the chess rating system for educational difficulty adjustment.

```javascript
// Elo Rating System for Education
function eloRatingSystem(userRating, itemRating, userScore, kFactor = 32) {
  const expectedScore = 1 / (1 + Math.pow(10, (itemRating - userRating) / 400));
  const actualScore = userScore; // 0 for wrong, 1 for correct
  
  const newRating = userRating + kFactor * (actualScore - expectedScore);
  
  return Math.max(0, newRating); // Ensure non-negative rating
}

function adjustItemDifficulty(itemRating, userRating, userScore, kFactor = 16) {
  const expectedScore = 1 / (1 + Math.pow(10, (userRating - itemRating) / 400));
  const actualScore = userScore;
  
  const newItemRating = itemRating + kFactor * (expectedScore - actualScore);
  
  return newItemRating;
}
```

##### Bayesian Knowledge Tracing (BKT)
Models user knowledge as a latent variable that changes over time.

```javascript
// Bayesian Knowledge Tracing Algorithm
function bktAlgorithm(prior, learnRate, guessRate, slipRate, responses) {
  let knowledge = prior;
  const knowledgeHistory = [knowledge];
  
  responses.forEach(response => {
    if (response === 1) {
      // Correct response
      const pCorrect = knowledge * (1 - slipRate) + (1 - knowledge) * guessRate;
      knowledge = (knowledge * (1 - slipRate)) / pCorrect;
    } else {
      // Incorrect response
      const pIncorrect = knowledge * slipRate + (1 - knowledge) * (1 - guessRate);
      knowledge = (knowledge * slipRate) / pIncorrect;
    }
    
    // Learning occurs after each response
    knowledge = knowledge + (1 - knowledge) * learnRate;
    knowledgeHistory.push(knowledge);
  });
  
  return { currentKnowledge: knowledge, history: knowledgeHistory };
}
```

#### Technical Implementation:
```javascript
// Adaptive Difficulty Algorithm
function calculateAdaptiveDifficulty(userPerformance, currentDifficulty) {
  const performanceWindow = getPerformanceWindow(userPerformance, 10); // Last 10 questions
  const averagePerformance = calculateAveragePerformance(performanceWindow);
  
  return adjustDifficulty(currentDifficulty, averagePerformance);
}

function adjustDifficulty(currentDifficulty, averagePerformance) {
  const difficultyLevels = ['easy', 'medium', 'hard'];
  const currentIndex = difficultyLevels.indexOf(currentDifficulty);
  
  if (averagePerformance >= 0.8) {
    // Increase difficulty
    return difficultyLevels[Math.min(currentIndex + 1, 2)];
  } else if (averagePerformance <= 0.4) {
    // Decrease difficulty
    return difficultyLevels[Math.max(currentIndex - 1, 0)];
  }
  
  return currentDifficulty; // Keep same difficulty
}

function getPerformanceWindow(userPerformance, windowSize) {
  return userPerformance.slice(-windowSize);
}

function calculateAveragePerformance(performanceWindow) {
  return performanceWindow.reduce((sum, perf) => sum + perf.score, 0) / performanceWindow.length;
}
```

#### Benefits:
- **Optimal Challenge**: Keeps users engaged without frustration
- **Confidence Building**: Prevents discouragement from overly difficult questions
- **Efficient Progress**: Maximizes learning efficiency
- **Personalized Experience**: Adapts to individual learning capabilities

### 4. Content Variety Strategy
**Purpose**: Ensure comprehensive coverage of Quran content through diverse question types

#### Implementation:
- **Question Type Rotation**: Cycle through different question formats
- **Content Area Coverage**: Ensure all Quran sections are covered
- **Difficulty Distribution**: Maintain balanced difficulty across content areas
- **Context Switching**: Present questions from different contexts to improve flexibility

#### Specific Algorithms:

##### Content Coverage Algorithm
Ensures balanced coverage across all Quran sections and topics.

```javascript
// Content Coverage Algorithm
function contentCoverageAlgorithm(userHistory, availableContent) {
  const coverageMap = new Map();
  const contentAreas = ['surah', 'juz', 'page', 'theme', 'topic'];
  
  // Calculate current coverage
  contentAreas.forEach(area => {
    const coverage = calculateCoverage(userHistory, area);
    coverageMap.set(area, coverage);
  });
  
  // Find areas with lowest coverage
  const minCoverage = Math.min(...coverageMap.values());
  const priorityAreas = contentAreas.filter(area => 
    coverageMap.get(area) <= minCoverage + 0.1
  );
  
  return selectContentFromAreas(priorityAreas, availableContent);
}

function calculateCoverage(history, area) {
  const totalItems = getTotalItems(area);
  const coveredItems = new Set(history.map(h => h[area])).size;
  return coveredItems / totalItems;
}
```

##### Question Type Rotation Algorithm
Implements intelligent rotation of question types to maintain engagement.

```javascript
// Question Type Rotation Algorithm
function questionTypeRotation(userHistory, availableTypes) {
  const typeFrequency = calculateTypeFrequency(userHistory);
  const recentTypes = userHistory.slice(-5).map(h => h.questionType);
  
  // Avoid repeating the same type too frequently
  const excludedTypes = recentTypes.filter(type => 
    typeFrequency[type] > 0.4
  );
  
  const candidateTypes = availableTypes.filter(type => 
    !excludedTypes.includes(type)
  );
  
  // Select type with lowest recent frequency
  return candidateTypes.reduce((lowest, type) => 
    typeFrequency[type] < typeFrequency[lowest] ? type : lowest
  );
}
```

##### Difficulty Distribution Algorithm
Maintains balanced difficulty across different content areas.

```javascript
// Difficulty Distribution Algorithm
function difficultyDistributionAlgorithm(userHistory, contentAreas) {
  const difficultyMap = new Map();
  
  contentAreas.forEach(area => {
    const areaHistory = userHistory.filter(h => h.contentArea === area);
    const avgDifficulty = calculateAverageDifficulty(areaHistory);
    difficultyMap.set(area, avgDifficulty);
  });
  
  // Find areas that need difficulty adjustment
  const targetDifficulty = 0.7; // Optimal difficulty level
  const tolerance = 0.1;
  
  const areasNeedingAdjustment = contentAreas.filter(area => {
    const currentDifficulty = difficultyMap.get(area);
    return Math.abs(currentDifficulty - targetDifficulty) > tolerance;
  });
  
  return areasNeedingAdjustment;
}
```

##### Context Switching Algorithm
Implements intelligent context switching to improve learning transfer.

```javascript
// Context Switching Algorithm
function contextSwitchingAlgorithm(userHistory, availableContexts) {
  const contextSequence = userHistory.slice(-10).map(h => h.context);
  const contextPatterns = analyzeContextPatterns(contextSequence);
  
  // Avoid repetitive patterns
  const recentPattern = contextSequence.slice(-3);
  const excludedContexts = findRepetitiveContexts(contextPatterns, recentPattern);
  
  // Select context that promotes learning transfer
  const candidateContexts = availableContexts.filter(context => 
    !excludedContexts.includes(context)
  );
  
  return selectOptimalContext(candidateContexts, userHistory);
}

function analyzeContextPatterns(sequence) {
  const patterns = [];
  for (let i = 0; i < sequence.length - 2; i++) {
    patterns.push(sequence.slice(i, i + 3));
  }
  return patterns;
}
```

#### Technical Implementation:
```javascript
// Content Variety Algorithm
function selectContentVariety(userHistory, availableQuestions) {
  const contentAreas = ['surah', 'juz', 'page', 'theme'];
  const questionTypes = ['mcq', 'fill_blank', 'matching', 'ordering'];
  
  const nextContentArea = selectNextContentArea(userHistory, contentAreas);
  const nextQuestionType = selectNextQuestionType(userHistory, questionTypes);
  
  return filterQuestionsByVariety(availableQuestions, nextContentArea, nextQuestionType);
}

function selectNextContentArea(userHistory, contentAreas) {
  const recentAreas = userHistory.slice(-5).map(q => q.contentArea);
  const areaFrequency = calculateFrequency(recentAreas, contentAreas);
  
  // Select least recently used area
  return contentAreas.reduce((leastUsed, area) => 
    areaFrequency[area] < areaFrequency[leastUsed] ? area : leastUsed
  );
}

function selectNextQuestionType(userHistory, questionTypes) {
  const recentTypes = userHistory.slice(-3).map(q => q.questionType);
  const typeFrequency = calculateFrequency(recentTypes, questionTypes);
  
  // Select least recently used type
  return questionTypes.reduce((leastUsed, type) => 
    typeFrequency[type] < typeFrequency[leastUsed] ? type : leastUsed
  );
}

function calculateFrequency(items, categories) {
  const frequency = {};
  categories.forEach(cat => frequency[cat] = 0);
  items.forEach(item => frequency[item] = (frequency[item] || 0) + 1);
  return frequency;
}

function filterQuestionsByVariety(questions, contentArea, questionType) {
  return questions.filter(q => 
    q.contentArea === contentArea && q.questionType === questionType
  );
}
```

#### Benefits:
- **Comprehensive Learning**: Covers all aspects of Quran content
- **Reduced Boredom**: Keeps learning interesting and engaging
- **Better Retention**: Improves memory through varied exposure
- **Skill Development**: Develops different types of knowledge and skills

## 🔄 Strategy Integration

### How Strategies Work Together:
```
User Performance Data → Strategy Analyzer
                        ↓
Strategy Selection → Question Engine
                        ↓
Strategy Application → Question Generation
                        ↓
Performance Feedback → Strategy Optimization
```

### Strategy Selection Criteria:
- **User Level**: Beginner, intermediate, or advanced
- **Learning Goals**: Specific objectives or general improvement
- **Performance History**: Past success rates and patterns
- **Time Constraints**: Available study time and frequency

## 📊 Strategy Effectiveness Metrics

### Distraction Strategy Metrics:
- Distractor effectiveness rates
- User discrimination accuracy
- Common mistake reduction
- Critical thinking improvement

### Study Strategy Metrics:
- Retention rates over time
- Learning efficiency scores
- Time-to-mastery measurements
- Long-term knowledge retention

### Adaptive Difficulty Metrics:
- Optimal challenge maintenance
- User engagement levels
- Progress rate consistency
- Confidence building indicators

### Content Variety Metrics:
- Content coverage breadth
- Question type distribution
- Context switching effectiveness
- Overall learning satisfaction

## 🎛️ Strategy Configuration

### Distraction Strategy Settings:
- Distractor generation algorithms
- Difficulty level of distractors
- Number of distraction options
- Distractor quality thresholds

### Study Strategy Settings:
- Spaced repetition intervals
- Performance thresholds
- Review scheduling algorithms
- Progress tracking parameters

### Adaptive Difficulty Settings:
- Difficulty adjustment sensitivity
- Performance window size
- Challenge level targets
- Confidence building parameters

### Content Variety Settings:
- Question type distribution
- Content area priorities
- Rotation frequency
- Coverage balance parameters 