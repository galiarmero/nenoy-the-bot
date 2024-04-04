# nenoy-the-bot
Personal assistant Telegram bot. Currently ships my daily puzzle scores to [galiarmero.dev/puzzle-scores](https://galiarmero.dev/puzzle-scores) 🚀

## Development


### Environment variables

| Variable                | Description                                                                                                                    | Value                                              |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| `BOT_TOKEN`             | Unique Telegram authentication token assigned when bot was created.                                                            | e.g. `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`   |
| `NENOY_API_BASE_URL`    | URL of the backend server.                                                                                                     | e.g. `https://nenoy-api.example.com`               |
| `ALLOWED_USER_IDS`      | Telegram user IDs that the bots will interact with.                                                                            | e.g. `324501,202910`                               |
| `NOTIF_CHAT_IDS`        | Telegram chat IDs where notifications will be sent.                                                                            | e.g. `90192920,2038494`                            |
| `NENOY_API_USER`        | Username for the backend server.                                                                                               |                                                    |
| `NENOY_API_PASS`        | Password for the backend server.                                                                                               |                                                    |
| `NENOY_API_TIMEOUT`     | _Optional_. Timeout in milliseconds on backend server requests.                                                                | Default: `5000`                                    |
| `NENOY_API_RETRY_MAX`   | _Optional._ Maximum number of retry attempts after encountering retriable errors.                                              | Default: `5`                                       |
| `NENOY_API_RETRY_DELAY` | _Optional._ Delay in milliseconds before retrying requests after retriable errors.                                             | Default: `10000`                                   |
| `WEBHOOK_BASE_URL`      | _Required when `UPDATE_METHOD` is not `polling`._ <br><br> URL of the webhook server where Telegram bot updates will be sent._ | e.g. `http://localhost:3000`                       |
| `UPDATE_METHOD`         | How updates from Telegram will be received by the bot.                                                                         | `polling` or `webhook` <br><br> Default: `webhook` |
| `NODE_ENV`              | Current deployment environment. Mainly used to decide how webhook server will be set up.                                       | `development` or `production`                      |

### Starting the bot

To start a local webhook server:

```sh
npm run dev
```