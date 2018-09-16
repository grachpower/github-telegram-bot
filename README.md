## Github telegram review bot

Telegram bot with github integration. Pullrequests watcher

## Usage:

* install docker
* clone repository `https://github.com/grachpower/github-telegram-bot.git`

### Sample Pipeline Configuration:

`.env` based in core directory
```
CLIENT_ID="gh app client id" 
SECRET_ID="gh app client secret"
REPOSITORY="github repository name"
OWNER="github owner/organization name"
BOT_TOKEN="telegram bot token"
CHAT_ID="telegram chat id"
```

### Starting
```
sh start.sh
```
