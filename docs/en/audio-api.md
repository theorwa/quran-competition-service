# Quran Audio API Documentation

This document describes the Quran Audio API integration feature that allows users to listen to Quranic verses (ayat) after answering questions.

## 🎵 Overview

The Quran Audio API feature enables users to:
- Listen to specific Quranic verses after answering questions
- Choose their preferred reciter (mashayikh)
- Enhance the learning experience through audio reinforcement

## 🔗 Audio CDN API

The service integrates with a Quran Audio CDN that provides audio files for all Quranic verses recited by multiple reciters.

### Base URL
```
https://the-quran-project.github.io/Quran-Audio/Data/{reciter_id}/{surah_number}_{ayah_number}.mp3
```

### URL Structure Breakdown

| Parameter | Description | Range | Example |
|-----------|-------------|-------|---------|
| `reciter_id` | ID of the preferred reciter | 1-5 | `2` |
| `surah_number` | Number of the surah | 1-114 | `100` |
| `ayah_number` | Number of the ayah within the surah | 1-N | `5` |

### Example URL
```
https://the-quran-project.github.io/Quran-Audio/Data/2/100_5.mp3
```
This URL provides:
- **Reciter ID**: 2 (second reciter)
- **Surah**: 100 (Al-Adiyat)
- **Ayah**: 5 (fifth ayah in the surah)

## 👥 Available Reciters

The API supports 5 different reciters, each with their unique recitation style:

| Reciter ID | Name | Description |
|------------|------|-------------|
| 1 | Reciter 1 | First reciter option |
| 2 | Reciter 2 | Second reciter option |
| 3 | Reciter 3 | Third reciter option |
| 4 | Reciter 4 | Fourth reciter option |
| 5 | Reciter 5 | Fifth reciter option |

## 🎯 Use Cases

### 1. Post-Question Audio Playback
After a user answers a question about a specific ayah, the system can:
- Generate the audio URL for that ayah
- Play the audio using the user's preferred reciter
- Reinforce learning through auditory memory

### 2. User Preference Management
Users can:
- Set their preferred reciter in their profile
- Change reciter preferences at any time
- Have their preference remembered across sessions

### 3. Learning Enhancement
- Audio playback helps with pronunciation
- Reinforces memorization through multiple senses
- Provides authentic Quranic recitation

## 🔧 Implementation Guidelines

### User Preference Storage
```typescript
interface UserPreferences {
  preferredReciter: number; // 1-5
  audioEnabled: boolean;
  autoPlayAudio: boolean;
}
```

### Audio URL Generation
```typescript
function generateAudioUrl(surahNumber: number, ayahNumber: number, reciterId: number): string {
  return `https://the-quran-project.github.io/Quran-Audio/Data/${reciterId}/${surahNumber}_${ayahNumber}.mp3`;
}
```

### Error Handling
- Handle cases where audio files might not exist
- Provide fallback reciter options
- Implement retry mechanisms for failed audio loads

## 📱 Frontend Integration

### Audio Player Component
```typescript
interface AudioPlayerProps {
  surahNumber: number;
  ayahNumber: number;
  reciterId: number;
  autoPlay?: boolean;
  onPlay?: () => void;
  onError?: (error: Error) => void;
}
```

### User Settings
- Reciter selection dropdown (1-5 options)
- Audio enable/disable toggle
- Auto-play after question toggle

## 🚀 Future Enhancements

### Planned Features
1. **Multiple Reciter Support**: Allow users to compare different recitations
2. **Playback Speed Control**: Adjust audio playback speed
3. **Audio Quality Options**: Different quality levels for different network conditions
4. **Offline Audio**: Cache frequently used audio files
5. **Audio Analytics**: Track which reciters are most popular

### Technical Improvements
1. **Caching Strategy**: Implement audio file caching
2. **Progressive Loading**: Load audio files progressively
3. **Error Recovery**: Better error handling and fallback mechanisms
4. **Performance Optimization**: Optimize audio loading and playback

## 🔍 Testing

### Audio URL Validation
- Test all reciter IDs (1-5)
- Test various surah and ayah combinations
- Verify audio file accessibility
- Test error scenarios

### User Experience Testing
- Test audio playback on different devices
- Verify user preference persistence
- Test audio quality and loading times
- Validate accessibility features

## 📋 Checklist for Implementation

- [ ] User preference storage system
- [ ] Audio URL generation utility
- [ ] Frontend audio player component
- [ ] User settings interface
- [ ] Error handling and fallbacks
- [ ] Audio caching mechanism
- [ ] Performance optimization
- [ ] Testing and validation
- [ ] Documentation updates

## 🔗 Related Documentation

- [Question Generation](./question-generation.md) - How questions are generated
- [User Manual](./user-manual.md) - End-user documentation
- [API Reference](./api.md) - General API documentation
- [Application Flow](./application-flow.md) - Main application flow

## 📞 Support

For questions or issues related to the Quran Audio API:
1. Check this documentation first
2. Review the implementation guidelines
3. Test with the provided examples
4. Create an issue if problems persist 