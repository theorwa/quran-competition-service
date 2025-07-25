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

### View logs for specific number of lines
```cmd
heroku logs -n 200 -a your-app-name
```

### View logs for a specific time period
```cmd
heroku logs --since 1h -a your-app-name
```

### View logs for a specific process type
```cmd
heroku logs --ps web -a your-app-name
```

## Dynos (Processes)

### Check dyno status
```cmd
heroku ps -a your-app-name
```

### Scale dynos
```cmd
heroku ps:scale web=1 worker=2 -a your-app-name
```

### Restart all dynos
```cmd
heroku restart -a your-app-name
```

### Restart a specific dyno
```cmd
heroku restart web.1 -a your-app-name
```

### Stop all dynos
```cmd
heroku ps:stop -a your-app-name
```

### Start all dynos
```cmd
heroku ps:start -a your-app-name
```

## Database

### View database info
```cmd
heroku addons -a your-app-name
```

### Open database console
```cmd
heroku pg:psql -a your-app-name
```

### View database stats
```cmd
heroku pg:info -a your-app-name
```

### Create database backup
```cmd
heroku pg:backups:capture -a your-app-name
```

### List database backups
```cmd
heroku pg:backups -a your-app-name
```

### Download database backup
```cmd
heroku pg:backups:download -a your-app-name
```

## Add-ons

### List all add-ons
```cmd
heroku addons -a your-app-name
```

### Install an add-on
```cmd
heroku addons:create addon-name:plan -a your-app-name
```

### Remove an add-on
```cmd
heroku addons:destroy addon-name -a your-app-name
```

### Upgrade an add-on
```cmd
heroku addons:upgrade addon-name:new-plan -a your-app-name
```

## Domains

### List custom domains
```cmd
heroku domains -a your-app-name
```

### Add a custom domain
```cmd
heroku domains:add www.yourdomain.com -a your-app-name
```

### Remove a custom domain
```cmd
heroku domains:remove www.yourdomain.com -a your-app-name
```

## Maintenance Mode

### Enable maintenance mode
```cmd
heroku maintenance:on -a your-app-name
```

### Disable maintenance mode
```cmd
heroku maintenance:off -a your-app-name
```

### Check maintenance mode status
```cmd
heroku maintenance -a your-app-name
```

## Releases

### View release history
```cmd
heroku releases -a your-app-name
```

### Rollback to previous release
```cmd
heroku rollback -a your-app-name
```

### Rollback to specific release
```cmd
heroku rollback v42 -a your-app-name
```

## SSH Access

### Enable SSH access
```cmd
heroku keys:add
```

### List SSH keys
```cmd
heroku keys
```

### Remove SSH key
```cmd
heroku keys:remove key-name
```

## Account Management

### Check account info
```cmd
heroku account
```

### List team members
```cmd
heroku access -a your-app-name
```

### Add team member
```cmd
heroku access:add user@example.com -a your-app-name
```

### Remove team member
```cmd
heroku access:remove user@example.com -a your-app-name
```

### Change member role
```cmd
heroku access:update user@example.com --permissions admin -a your-app-name
```

## Useful Tips

### Set default app (so you don't need -a flag)
```cmd
heroku git:remote -a your-app-name
```

### Check Heroku CLI version
```cmd
heroku version
```

### Update Heroku CLI
```cmd
heroku update
```

### Get help for any command
```cmd
heroku help
heroku help config
heroku help ps
```

### Run one-off commands
```cmd
heroku run "your-command" -a your-app-name
```

### Run interactive bash session
```cmd
heroku run bash -a your-app-name
```

## Common Workflows

### Deploy a new version
```cmd
git add .
git commit -m "Your commit message"
git push heroku main
```

### Check app status after deployment
```cmd
heroku ps -a your-app-name
heroku logs --tail -a your-app-name
```

### Debug deployment issues
```cmd
heroku logs -a your-app-name
heroku config -a your-app-name
heroku ps -a your-app-name
```

### Scale app for production
```cmd
heroku ps:scale web=2 worker=1 -a your-app-name
```

## Troubleshooting

### If commands don't work:
1. Check if you're logged in: `heroku auth:whoami`
2. Check if you have access to the app: `heroku access -a your-app-name`
3. Update Heroku CLI: `heroku update`
4. Check your Git remote: `git remote -v`

### Common Issues:
- **Permission denied**: Make sure you're logged in and have access to the app
- **App not found**: Check the app name spelling and your access permissions
- **Git push fails**: Make sure you have the Heroku remote set up correctly

## Notes for Windows Users

- Use `cmd` or PowerShell for these commands
- If using PowerShell, you might need to run: `Set-ExecutionPolicy RemoteSigned`
- Some commands might work differently in Git Bash
- Always use quotes around values with spaces
- Use backslashes (`\`) for file paths in Windows 