# URL Saver Telegram Bot Server

This is the server component for the URL Saver system, including a Telegram bot that saves URLs sent to it.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root of the server directory with the following variables:
   ```
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/url-saver
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   API_URL=http://localhost:4000/api/urls
   ```

3. Replace `your_telegram_bot_token_here` with your actual Telegram bot token obtained from BotFather.

4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /api/urls` - Add a new URL
- `GET /api/urls` - Get all saved URLs 