# User Onboarding Flow Documentation

This document describes the comprehensive onboarding process for new users of the Quran Competition Service, focusing on creating personalized learning profiles and establishing initial memorization assessments.

## 🎯 Overview

The onboarding flow is the critical first interaction between users and the Quran Competition Service. It establishes the foundation for personalized learning by assessing the user's current memorization status and preferences.

## 👤 Target Users

### New Users
- First-time visitors to the application
- Users who haven't completed the onboarding process
- Users returning after a long absence (profile reset)

### Returning Users
- Users updating their memorization progress
- Users changing their learning preferences
- Users expanding their memorized sections

## 🚀 Onboarding Flow Steps

### Step 1: Welcome & Introduction

#### Welcome Screen
- **Greeting Message**: Personalized welcome based on time of day
- **App Purpose**: Clear explanation of the service's benefits
- **Value Proposition**: How the app helps with Quran memorization
- **Time Estimate**: "This will take about 5-7 minutes"

#### User Agreement
- **Terms of Service**: Brief overview with link to full terms
- **Privacy Policy**: Data usage explanation
- **Audio Preferences**: Initial audio settings (can be changed later)

### Step 2: Basic Information Collection

#### User Profile Setup
```typescript
interface BasicUserInfo {
  displayName: string;
  email?: string; // Optional for guest users
  preferredLanguage: 'ar' | 'en';
  timezone: string;
  notificationPreferences: {
    dailyReminders: boolean;
    weeklyReports: boolean;
    achievementAlerts: boolean;
  };
}
```

#### Learning Goals
- **Primary Goal**: Memorization, Review, or Both
- **Target Timeline**: Short-term (1-3 months), Medium-term (3-6 months), Long-term (6+ months)
- **Study Frequency**: Daily, 2-3 times/week, Weekly

### Step 3: Memorization Assessment

#### Current Memorization Status

**Surah Selection Interface:**
- **Visual Quran Layout**: Interactive grid showing all 114 surahs
- **Color Coding**: 
  - 🟢 Memorized (Green)
  - 🟡 Partially Memorized (Yellow)
  - 🔴 Not Memorized (Red)
  - ⚪ Not Started (White)

**Selection Methods:**
1. **Quick Selection**: "I've memorized the first 10 surahs"
2. **Individual Selection**: Tap each surah to mark status
3. **Range Selection**: "From Surah 1 to Surah 20"
4. **Juz Selection**: "I've memorized Juz 1, 2, and 3"

#### Mastery Level Assessment

For each selected surah/juz, users specify their confidence level:

```typescript
enum MasteryLevel {
  BEGINNER = 'beginner',      // Recently memorized, needs frequent review
  INTERMEDIATE = 'intermediate', // Good retention, occasional mistakes
  ADVANCED = 'advanced',      // Strong memorization, rare mistakes
  EXPERT = 'expert'           // Excellent retention, very confident
}

interface MemorizationItem {
  type: 'surah' | 'juz' | 'page' | 'hizb';
  number: number;
  masteryLevel: MasteryLevel;
  lastReviewed?: Date;
  confidenceScore: number; // 1-10 scale
}
```

### Step 4: Learning Preferences

#### Question Type Preferences
- **Multiple Choice**: Traditional 4-option questions
- **Fill in the Blank**: Complete missing words
- **Sequencing**: Arrange verses in correct order
- **Audio Recognition**: Identify verses from audio
- **Translation Matching**: Match Arabic text with translations

#### Difficulty Preferences
- **Adaptive**: System adjusts based on performance
- **Fixed Level**: User chooses consistent difficulty
- **Progressive**: Gradually increases difficulty

#### Study Session Preferences
- **Session Length**: 5, 10, 15, 20, or 30 minutes
- **Questions per Session**: 5, 10, 15, or 20 questions
- **Break Reminders**: Every 10, 15, or 20 minutes

### Step 5: Audio Preferences

#### Reciter Selection
```typescript
interface AudioPreferences {
  preferredReciter: number; // 1-5 available reciters
  autoPlayAudio: boolean;
  audioVolume: number; // 0-100
  playOnQuestionComplete: boolean;
  playOnAnswer: boolean;
}
```

#### Audio Integration
- **Test Audio**: Sample recitation for each reciter
- **Quality Settings**: Standard or High quality
- **Download Preferences**: Auto-download for offline use

### Step 6: Profile Review & Confirmation

#### Summary Screen
- **Memorization Summary**: Visual overview of selected content
- **Learning Goals**: Confirmation of selected objectives
- **Preferences Review**: All selected settings
- **Estimated Questions**: "Based on your profile, we'll generate ~150 questions"

#### Edit Options
- **Quick Edit**: Modify any section before finalizing
- **Skip Sections**: Mark sections for later completion
- **Save Progress**: Resume onboarding later

## 📊 Data Structure

### Complete User Profile
```typescript
interface UserProfile {
  userId: string;
  basicInfo: BasicUserInfo;
  learningGoals: LearningGoals;
  memorizationStatus: {
    surahs: MemorizationItem[];
    juzs: MemorizationItem[];
    pages: MemorizationItem[];
    hizbs: MemorizationItem[];
  };
  preferences: {
    questionTypes: QuestionType[];
    difficulty: DifficultyPreference;
    sessionSettings: SessionSettings;
    audio: AudioPreferences;
  };
  onboardingCompleted: boolean;
  onboardingCompletedAt?: Date;
  createdAt: Date;
  lastUpdated: Date;
}
```

## 🔄 Dynamic Profile Updates

### Real-time Adjustments
- **Performance Tracking**: Update mastery levels based on quiz results
- **Learning Patterns**: Adjust preferences based on user behavior
- **Progress Updates**: Add newly memorized sections
- **Goal Achievement**: Track progress toward learning objectives

### Profile Maintenance
- **Regular Reviews**: Monthly profile review prompts
- **Progress Updates**: Easy way to update memorization status
- **Preference Changes**: Modify settings anytime
- **Goal Adjustments**: Update learning objectives

## 🎯 Success Metrics

### Onboarding Completion
- **Completion Rate**: Percentage of users who finish onboarding
- **Time to Complete**: Average time spent in onboarding
- **Drop-off Points**: Where users abandon the process
- **Profile Accuracy**: How well initial assessment matches actual performance

### User Engagement
- **First Session Completion**: Users who complete their first quiz
- **Return Rate**: Users who return within 7 days
- **Profile Updates**: Frequency of profile modifications
- **Feature Adoption**: Usage of different question types

## 🔧 Technical Implementation

### API Endpoints
```typescript
// Onboarding endpoints
POST /api/onboarding/start          // Initialize onboarding session
POST /api/onboarding/basic-info     // Save basic information
POST /api/onboarding/memorization   // Save memorization status
POST /api/onboarding/preferences    // Save learning preferences
POST /api/onboarding/complete       // Complete onboarding process
GET  /api/onboarding/progress       // Get onboarding progress
PUT  /api/onboarding/update         // Update any onboarding data

// Profile management
GET  /api/profile                   // Get user profile
PUT  /api/profile                   // Update profile
POST /api/profile/validate          // Validate profile data
```

### Database Schema
```sql
-- User profiles table
CREATE TABLE user_profiles (
  user_id VARCHAR(255) PRIMARY KEY,
  basic_info JSONB,
  learning_goals JSONB,
  memorization_status JSONB,
  preferences JSONB,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Onboarding sessions table
CREATE TABLE onboarding_sessions (
  session_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  step_completed VARCHAR(50),
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);
```

## 📱 User Interface Guidelines

### Design Principles
- **Progressive Disclosure**: Show only relevant information at each step
- **Visual Feedback**: Clear progress indicators and success states
- **Error Prevention**: Validate inputs and provide helpful error messages
- **Accessibility**: Support for screen readers and keyboard navigation

### Mobile Considerations
- **Touch-Friendly**: Large touch targets and swipe gestures
- **Offline Capability**: Save progress locally if connection is lost
- **Responsive Design**: Adapt to different screen sizes
- **Performance**: Fast loading and smooth animations

## 🚀 Future Enhancements

### Advanced Onboarding Features
- **Placement Tests**: Interactive quizzes to assess current knowledge
- **AI-Powered Recommendations**: Suggest optimal learning paths
- **Social Onboarding**: Connect with friends or study groups
- **Gamification**: Achievements and rewards during onboarding

### Personalization Improvements
- **Learning Style Assessment**: Visual, auditory, or kinesthetic preferences
- **Time-based Optimization**: Suggest study times based on user patterns
- **Cultural Adaptations**: Region-specific content and preferences
- **Accessibility Features**: Enhanced support for users with disabilities

## 📝 Development Notes

### Best Practices
- **Save Progress Frequently**: Don't lose user data
- **Provide Clear Instructions**: Each step should be self-explanatory
- **Allow Back Navigation**: Users should be able to go back and edit
- **Test with Real Users**: Validate the flow with actual users
- **Monitor Performance**: Track loading times and error rates

### Common Pitfalls
- **Overwhelming Users**: Too many options can cause decision paralysis
- **Rigid Flow**: Inflexible process that doesn't adapt to user needs
- **Poor Validation**: Unclear error messages or validation rules
- **Slow Performance**: Long loading times between steps

---

*This documentation will be updated as the onboarding flow evolves based on user feedback and testing.* 