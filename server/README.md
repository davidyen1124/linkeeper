# URL Saver Telegram Bot Server

This is the server component for the URL Saver system, including a Telegram bot that saves URLs sent to it.

## Features

- **URL Storage**: Save and manage URLs with metadata
- **Social Media Detection**: Automatically detects URLs from Facebook, Instagram, Threads, and YouTube
- **Tag Support**: Add custom tags to organize your URLs
- **Telegram Bot Integration**: Send URLs via Telegram bot
- **Clean Architecture**: Well-structured codebase following Clean Architecture principles

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

### Add URL
`POST /api/urls`

Add a new URL with optional tags. The system will automatically detect if the URL is from Facebook, Instagram, Threads, or YouTube.

**Request Body:**
```json
{
  "url": "https://www.youtube.com/shorts/abc123",
  "tags": ["youtube", "shorts", "entertainment"] // Optional
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "url": "https://www.youtube.com/shorts/abc123",
  "title": "Amazing Short Video",
  "description": "Check out this amazing short video",
  "image": "https://example.com/thumbnail.jpg",
  "source": "youtube",  // Automatically detected
  "tags": ["youtube", "shorts", "entertainment"],
  "createdAt": "2023-12-07T10:30:00.000Z",
  "isNew": true
}
```

### Get All URLs
`GET /api/urls`

Retrieve all saved URLs with their metadata, source information, and tags.

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "title": "YouTube Video",
    "description": "Interesting video",
    "image": "https://example.com/thumbnail.jpg",
    "source": "youtube",
    "tags": ["youtube", "video", "music"],
    "createdAt": "2023-12-07T10:30:00.000Z"
  }
]
```

## Supported Sources

The system automatically detects URLs from the following platforms:

- **Facebook**: Posts, videos, photos, events
- **Instagram**: Posts, reels, stories, IGTV
- **Threads**: Posts
- **YouTube**: Videos, Shorts, playlists, channels

When a URL from these platforms is detected, the `source` field will be automatically populated.

### YouTube URL Detection

The system can identify different types of YouTube content:

- **Videos**: `https://www.youtube.com/watch?v=VIDEO_ID` or `https://youtu.be/VIDEO_ID` → Type: `video`
- **Shorts**: `https://www.youtube.com/shorts/VIDEO_ID` → Type: `short`
- **Playlists**: `https://www.youtube.com/playlist?list=PLAYLIST_ID` → Type: `playlist`
- **Channels**: `https://www.youtube.com/channel/CHANNEL_ID`, `https://www.youtube.com/c/CHANNEL_NAME`, or `https://www.youtube.com/@USERNAME` → Type: `channel`

## Testing

Run the YouTube analysis test:
```bash
npm run build
node dist/test-youtube-analysis.js
```

Use the provided `test-api.http` file to test the API endpoints with various social media URLs including YouTube. 