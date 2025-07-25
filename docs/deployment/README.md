# Deployment & Operations Guide

This directory contains all documentation related to deploying and operating the Quran Competition Service.

## 📋 Available Guides

### 🚀 Heroku Deployment
- **[Heroku CLI Commands](./heroku-cli-commands.md)** - Complete reference for managing Heroku apps from Windows command line
  - Environment variable management
  - App deployment and scaling
  - Logs and monitoring
  - Database operations
  - Troubleshooting

### 🔧 Environment Configuration (Coming Soon)
- Environment variables setup
- Configuration management
- Secrets management

### 📊 Monitoring & Logs (Coming Soon)
- Application monitoring
- Performance tracking
- Error handling

### 🔄 CI/CD (Coming Soon)
- Automated deployment
- Testing in pipeline
- Rollback procedures

## Quick Start

1. **View Heroku CLI Commands**: [heroku-cli-commands.md](./heroku-cli-commands.md)
2. **Set up environment variables**: See the environment variables section in the Heroku CLI guide
3. **Deploy your app**: Follow the deployment workflow in the Heroku CLI guide

## Common Tasks

### Deploy a New Version
```bash
git add .
git commit -m "Your commit message"
git push heroku main
```

### Check App Status
```bash
heroku ps -a your-app-name
heroku logs --tail -a your-app-name
```

### Manage Environment Variables
```bash
# View all variables
heroku config -a your-app-name

# Set a variable
heroku config:set VARIABLE_NAME=value -a your-app-name

# Get a specific variable
heroku config:get VARIABLE_NAME -a your-app-name
```

## Need More Help?

- Check the [main documentation README](../README.md) for other guides
- Refer to the [Heroku CLI Commands](./heroku-cli-commands.md) for detailed command reference
- Create an issue if you need additional deployment documentation 