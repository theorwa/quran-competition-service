# Application Flow Documentation

This document describes the main flow of the Quran Competition Service application, including user experience and system interactions.

## 🎯 Overview

The Quran Competition Service is designed to help users test and improve their Quran memorization through personalized question generation. The application adapts to each user's memorization level and provides targeted practice.

## 👤 User Onboarding Flow

### First-Time User Experience

When a user first accesses the application, they go through an onboarding process to establish their initial memorization profile.

#### Step 1: Welcome Screen
- User is greeted with a welcome message
- Brief explanation of the application's purpose
- Option to start the onboarding process

#### Step 2: Memorization Assessment

The user is asked to specify which parts of the Quran they have memorized:

**Available Options (First Version):**
- **Surahs**: Individual chapters of the Quran (1-114)
- **Juz**: 30 parts of the Quran (1-30)

*Note: Future versions will include more granular options like pages and hizbs.*

#### Step 3: Mastery Level Specification

For each selected surah or juz, the user must specify their perceived mastery level:

**Mastery Levels:**
- **Beginner**: Recently memorized, needs frequent review
- **Intermediate**: Good retention, occasional mistakes
- **Advanced**: Strong memorization, rare mistakes
- **Expert**: Excellent retention, very confident

#### Step 4: Profile Creation

The system creates an initial user profile with:
- Selected memorized surahs/juzs
- Initial mastery levels for each selection
- User preferences and settings

### Data Structure

```typescript
interface UserProfile {
  userId: string;
  memorizedSurahs: {
    surahNumber: number;
    masteryLevel: MasteryLevel;
  }[];
  memorizedJuzs: {
    juzNumber: number;
    masteryLevel: MasteryLevel;
  }[];
  createdAt: Date;
  lastUpdated: Date;
}

enum MasteryLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}
```

## 🔄 Dynamic Mastery Adjustment

The initial mastery levels are not static. They will be continuously updated based on:

- **Question Performance**: How well the user answers questions
- **Response Time**: Speed of correct answers
- **Error Patterns**: Types of mistakes made
- **Review Frequency**: How often they practice specific sections

## 🎯 Question Generation Strategy

Based on the user's profile, the system will:

1. **Focus on Weak Areas**: Generate more questions for sections with lower mastery
2. **Reinforce Strong Areas**: Occasional questions for well-mastered sections
3. **Progressive Difficulty**: Adjust question complexity based on performance
4. **Spaced Repetition**: Schedule reviews at optimal intervals

## 📈 Future Enhancements

### Planned Features:
- **Page-level Selection**: Allow users to specify memorized pages
- **Hizb-level Selection**: More granular memorization tracking
- **Ayah-level Tracking**: Individual verse mastery
- **Learning Analytics**: Detailed progress reports
- **Social Features**: Compare progress with others
- **Custom Study Plans**: Personalized learning schedules

### Advanced Onboarding:
- **Placement Tests**: Assess current knowledge through questions
- **Learning Goals**: Set specific memorization targets
- **Study Preferences**: Preferred question types and difficulty
- **Time Availability**: Schedule optimization based on user's time

## 🔧 Technical Implementation

### API Endpoints Needed:
- `POST /api/users/onboarding` - Complete onboarding process
- `GET /api/users/profile` - Retrieve user profile
- `PUT /api/users/profile` - Update mastery levels
- `POST /api/questions/generate` - Generate personalized questions

### Database Schema:
- User profiles table
- Memorization records table
- Question history table
- Performance metrics table

## 📝 Notes for Developers

- Keep the onboarding process simple and intuitive
- Validate user inputs thoroughly
- Provide clear feedback during each step
- Allow users to skip sections they're unsure about
- Implement a way to update profiles later
- Consider offline capability for initial setup

---

*This documentation will be expanded as new features are added to the application.* 