# Heroku CLI Commands for Windows

This document contains common Heroku CLI commands you can use in Windows Command Prompt to manage your Heroku applications.

## Prerequisites

1. Install Heroku CLI from: https://devcenter.heroku.com/articles/heroku-cli
2. Login to Heroku: `heroku login`

## App Management

### List all your apps
```cmd
heroku apps
```

### Create a new app
```cmd
heroku create your-app-name
```

### Clone an existing app
```cmd
heroku git:clone -a your-app-name
```

### Rename an app
```cmd
heroku apps:rename new-app-name -a old-app-name
```

### Delete an app
```cmd
heroku apps:destroy your-app-name --confirm your-app-name
```

### Open your app in browser
```cmd
heroku open -a your-app-name
```

## Environment Variables

### View all environment variables for an app
```cmd
heroku config -a your-app-name
```

### View a specific environment variable
```cmd
heroku config:get VARIABLE_NAME -a your-app-name
```

### Set a single environment variable
```cmd
heroku config:set VARIABLE_NAME=value -a your-app-name
```

### Set multiple environment variables
```cmd
heroku config:set VARIABLE1=value1 VARIABLE2=value2 -a your-app-name
```

### Remove an environment variable
```cmd
heroku config:unset VARIABLE_NAME -a your-app-name
```

### Set environment variables from a .env file
```cmd
heroku config:set $(cat .env | tr '\n' ' ') -a your-app-name
```

## Deployment

### Deploy to Heroku (if using Git)
```cmd
git push heroku main
```

### Deploy to Heroku (if using master branch)
```cmd
git push heroku master
```

### Force deploy (overwrite remote changes)
```cmd
git push heroku main --force
```

### Deploy a specific branch
```cmd
git push heroku your-branch:main
```

## Logs and Monitoring

### View real-time logs
```cmd
heroku logs --tail -a your-app-name
```

### View recent logs
```cmd
heroku logs -a your-app-name
```

### View logs for a specific number of lines
```cmd
heroku logs -n 200 -a your-app-name
```

### View logs for a specific time period
```cmd
heroku logs --since 1h -a your-app-name
```

## Dynos and Scaling

### Check dyno status
```cmd
heroku ps -a your-app-name
```

### Scale web dynos
```cmd
heroku ps:scale web=1 -a your-app-name
```

### Scale worker dynos
```cmd
heroku ps:scale worker=1 -a your-app-name
```

### Restart all dynos
```cmd
heroku restart -a your-app-name
```

### Restart a specific dyno
```cmd
heroku restart web.1 -a your-app-name
```

## Database

### Open database console
```cmd
heroku pg:psql -a your-app-name
```

### Backup database
```cmd
heroku pg:backups:capture -a your-app-name
```

### Download database backup
```cmd
heroku pg:backups:download -a your-app-name
```

### Restore database from backup
```cmd
heroku pg:backups:restore b001 -a your-app-name
```

## Add-ons

### List add-ons
```cmd
heroku addons -a your-app-name
```

### Install an add-on
```cmd
heroku addons:create heroku-postgresql:hobby-dev -a your-app-name
```

### Remove an add-on
```cmd
heroku addons:destroy heroku-postgresql -a your-app-name
```

## Maintenance

### Enable maintenance mode
```cmd
heroku maintenance:on -a your-app-name
```

### Disable maintenance mode
```cmd
heroku maintenance:off -a your-app-name
```

### Check maintenance status
```cmd
heroku maintenance -a your-app-name
```

## Troubleshooting

### Check app status
```cmd
heroku apps:info -a your-app-name
```

### View build logs
```cmd
heroku builds -a your-app-name
```

### Check build status
```cmd
heroku builds:info -a your-app-name
```

### Run one-off dyno
```cmd
heroku run bash -a your-app-name
```

### Run a specific command
```cmd
heroku run npm start -a your-app-name
```

## Useful Tips

1. **Always specify the app name** with `-a your-app-name` to avoid confusion
2. **Use `--tail` for logs** to see real-time updates
3. **Check dyno status** before scaling or restarting
4. **Backup your database** before making major changes
5. **Use maintenance mode** for planned downtime

## Common Issues

### App not found
- Check if you're logged in: `heroku auth:whoami`
- Verify app name: `heroku apps`
- Check if you have access to the app

### Deployment failed
- Check build logs: `heroku builds -a your-app-name`
- Verify your Procfile is correct
- Check if all dependencies are in package.json

### Database connection issues
- Verify database add-on is active: `heroku addons -a your-app-name`
- Check database URL: `heroku config:get DATABASE_URL -a your-app-name`
- Test connection: `heroku pg:psql -a your-app-name` 