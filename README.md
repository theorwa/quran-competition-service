# Quran Competition Service

A Node.js/TypeScript service for managing Quran competition questions and quizzes.

## 📚 Documentation

- **[📖 Full Documentation](./docs/README.md)** - Complete project documentation
- **[🌍 English Documentation](./docs/en/README.md)** - English documentation index
- **[🌍 Arabic Documentation](./docs/ar/README.md)** - فهرس التوثيق العربي
- **[🧠 Engines & Strategies](./docs/en/engines.md)** - Question and Personalization engines
- **[📊 Learning Strategies](./docs/en/strategies.md)** - Detailed learning algorithms
- **[🚀 Heroku Deployment](./docs/en/heroku.md)** - Deployment guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Heroku CLI (for deployment)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Deploy to Heroku
```bash
git push heroku main
```

## 📁 Project Structure

```
quran-competition-service/
├── docs/                    # 📚 Documentation
│   ├── README.md           # Main documentation index
│   ├── en/                 # English documentation
│   │   ├── README.md       # English index
│   │   ├── engines.md      # Question & Personalization engines
│   │   ├── strategies.md   # Learning strategies & algorithms
│   │   └── heroku.md       # Deployment guide
│   └── ar/                 # Arabic documentation
│       ├── README.md       # فهرس التوثيق العربي
│       ├── engines.md      # محركات الأسئلة والتخصيص
│       ├── strategies.md   # استراتيجيات التعلم والخوارزميات
│       └── heroku.md       # دليل النشر
├── src/                    # 🔧 Source code
│   ├── controllers/        # API controllers
│   ├── generators/         # Question generators
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   └── utils/             # Utility functions
├── data/                   # 📊 Data files
├── config/                 # ⚙️ Configuration
└── scripts/               # 🔨 Build scripts
```

## 🔧 Environment Variables

Key environment variables for the service:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- Database configuration variables (see deployment guide)

## 🧠 Core Features

### Question Engine
- **Content Processing**: Analyze and process Quran text data
- **Question Generation**: Create various types of questions (MCQ, fill-in-blank, etc.)
- **Distraction Strategy**: Implement semantic similarity, misconceptions, and logical alternatives
- **Quality Assurance**: Ensure questions meet educational standards

### Personalization Engine
- **User Profiling**: Build and maintain user learning profiles
- **Study Strategies**: Implement spaced repetition algorithms (SM-2, Leitner, Anki)
- **Adaptive Learning**: Dynamically adjust question difficulty
- **Performance Analytics**: Track and optimize learning progress

## 📖 API Documentation

The service provides a REST API for:
- Question generation with distraction strategies
- Personalized learning with study strategies
- Quiz management and competition features
- Performance tracking and analytics

API documentation is available via Swagger when the service is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

[Add your license information here]

## 🆘 Support

- Check the [documentation](./docs/README.md) first
- Create an issue for bugs or feature requests
- Contact the development team for urgent issues 