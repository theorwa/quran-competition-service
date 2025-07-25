# Quran Competition Service

A Node.js/TypeScript service for managing Quran competition questions and quizzes.

## 📚 Documentation

- **[📖 Full Documentation](./docs/README.md)** - Complete project documentation
- **[🚀 Deployment Guide](./docs/deployment/README.md)** - How to deploy and manage the service
- **[⚡ Heroku CLI Commands](./docs/deployment/heroku-cli-commands.md)** - Essential commands for managing your Heroku apps

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
│   ├── README.md           # Documentation index
│   └── deployment/         # Deployment guides
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

## 📖 API Documentation

The service provides a REST API for:
- Question generation
- Quiz management
- Competition features

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