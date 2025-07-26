# Question Engines

## Overview

The question generation system consists of two main engines working together to provide a personalized learning experience. Each engine has specific responsibilities and capabilities.

## 🧠 Core Engines

### 1. Question Engine
**Primary Function**: Generate new and diverse questions from Quran content

#### Responsibilities:
- **Content Processing**: Analyze and process Quran text data
- **Question Generation**: Create various types of questions (MCQ, fill-in-blank, etc.)
- **Quality Assurance**: Ensure questions meet educational standards
- **Diversity Management**: Maintain variety in question types and difficulty levels
- **Content Isolation**: Works independently without user-specific data

#### Technical Capabilities:
- **Pattern Recognition**: Identify question-worthy content patterns
- **Context Understanding**: Maintain context when generating questions
- **Answer Generation**: Create correct answers for generated questions
- **Validation**: Verify question-answer pairs for accuracy
- **Content-Based Generation**: Generates questions purely from content analysis
- **Distraction Strategy Implementation**: Apply semantic similarity, common misconceptions, partial truths, and logical alternatives
- **Question Quality Optimization**: Ensure distractors are plausible but incorrect

#### Input Sources:
- Quran text data (verses, chapters, pages)
- Question type specifications
- Difficulty level requirements
- Content filtering parameters

#### Output:
- Structured question objects
- Multiple choice options
- Correct answer identification
- Difficulty classification
- Content-agnostic question sets

### 2. Personalization Engine
**Primary Function**: Determine appropriate questions for each user based on their learning profile

#### Responsibilities:
- **User Profiling**: Build and maintain user learning profiles
- **Question Selection**: Choose the most suitable questions for each user
- **Progress Tracking**: Monitor user learning progress
- **Adaptive Learning**: Adjust question selection based on performance

#### Technical Capabilities:
- **Learning Analytics**: Analyze user performance patterns
- **Recommendation System**: Suggest optimal question sequences
- **Difficulty Adjustment**: Dynamically adjust question difficulty
- **Spaced Repetition**: Implement spaced repetition algorithms (SM-2, Leitner, Anki)
- **Study Strategy Implementation**: Apply intelligent study strategies for optimal question selection
- **Performance-Based Adaptation**: Adjust strategies based on user learning patterns

#### Input Sources:
- User performance data
- Question history
- Learning preferences
- Time-based patterns

#### Output:
- Personalized question recommendations
- Learning path suggestions
- Progress reports
- Difficulty adjustments

## 🔄 Engine Interaction Flow

```
User Request → Personalization Engine
                ↓
Personalization Engine analyzes user profile
                ↓
Personalization Engine requests specific question types
                ↓
Question Engine generates questions with specified parameters (no user data)
                ↓
Personalization Engine filters and ranks questions based on user profile
                ↓
Final question set delivered to user
                ↓
User performance data collected
                ↓
Data fed back to Personalization Engine for learning
```

## 🏗️ Architecture Components

### Question Engine Components:
- **Content Parser**: Processes Quran text data
- **Question Generator**: Creates questions using various algorithms
- **Answer Generator**: Generates correct and incorrect answers
- **Quality Validator**: Ensures question quality and accuracy

### Personalization Engine Components:
- **User Profile Manager**: Maintains user learning profiles
- **Recommendation Engine**: Suggests optimal questions
- **Performance Analyzer**: Analyzes user performance data
- **Learning Path Optimizer**: Optimizes learning sequences

## 📊 Performance Metrics

### Question Engine Metrics:
- Question generation speed
- Question quality scores
- Answer accuracy rates
- Content coverage breadth

### Personalization Engine Metrics:
- User engagement rates
- Learning progress speed
- Question relevance scores
- User satisfaction levels

## 🔧 Configuration Options

### Question Engine Settings:
- Question type preferences
- Difficulty level ranges
- Content source selection
- Quality thresholds

### Personalization Engine Settings:
- Learning algorithm parameters
- Spaced repetition intervals
- Difficulty adjustment sensitivity
- Progress tracking granularity 