# 📎 URL Saver System

A comprehensive system that consists of a Telegram bot and a website to save and display URLs with intelligent source detection and tagging capabilities.

## ✨ Features

- 🤖 **Telegram Bot**: Listen to messages and save URLs automatically
- 🌐 **Web Interface**: Display saved URLs with beautiful previews
- 🔍 **Smart Source Detection**: Automatically detect URLs from Facebook, Instagram, Threads, and YouTube
- 🏷️ **Tag Support**: Add custom tags to organize your URLs
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Real-time Updates**: Automatically refresh URL list
- 🖼️ **Rich URL Previews**: Show title, description, images, source badges, and tags
- 🏗️ **Clean Architecture**: Well-structured codebase following Clean Architecture principles

## 🎯 Supported Platforms

The system automatically detects URLs from the following platforms:

- **Facebook**: Posts, videos, photos, events
- **Instagram**: Posts, reels, stories, IGTV
- **Threads**: Posts
- **YouTube**: Videos, Shorts, playlists, channels

When a URL from these platforms is detected, it's automatically tagged with the appropriate source.

## 🛠️ Tech Stack

### Next.js (Full Stack)
- **TypeScript** - Type-safe JavaScript
- **Next.js** - Unified frontend and API routes
- **MongoDB** - Database for storing URLs
- **Telegraf** - Telegram bot framework
- **Cheerio** - Web scraping for URL metadata
- **Axios** - HTTP client
- **Clean Architecture** - Domain-driven design pattern for server logic

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Telegram Bot Token (from @BotFather)

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
MONGODB_URI=mongodb://localhost:27017/url-saver
NEXT_PUBLIC_API_BASE_URL=/api
PORT=3000
```

### 3. Get Telegram Bot Token

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token and add it to your `.env` file

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or if using MongoDB service
sudo systemctl start mongod
```

### 5. Run the Application

#### Start the Telegram Bot
```bash
npm run start-bot
```

#### Start the Next.js App
```bash
npm run dev
```

The web interface will be available at `http://localhost:3000`

## 📱 Usage

1. **Start the Telegram Bot**: Send `/start` to your bot in Telegram
2. **Send URLs**: Send any URL to the bot, and it will be saved automatically with source detection
3. **View URLs**: Open the web interface to see all saved URLs with:
   - Rich previews with images
   - Source badges (Facebook, Instagram, Threads, YouTube)
   - Custom tags
   - Organized metadata
4. **Refresh**: Click the refresh button or wait for automatic updates

## 🔧 API Endpoints

### Add URL with Tags
```http
POST /api/urls
Content-Type: application/json

{
  "url": "https://www.youtube.com/shorts/abc123",
  "tags": ["youtube", "shorts", "entertainment"]
}
```

### Get All URLs
```http
GET /api/urls
```

Returns URLs with source detection and tags:
```json
{
  "id": "507f1f77bcf86cd799439011",
  "url": "https://www.youtube.com/shorts/abc123",
  "title": "Amazing Short Video",
  "description": "Check out this amazing short video",
  "image": "https://example.com/thumbnail.jpg",
  "source": "youtube",
  "tags": ["youtube", "shorts", "entertainment"],
  "createdAt": "2023-12-07T10:30:00.000Z"
}
```

## 📁 Project Structure (Clean Architecture)

```
├── server/                     # Backend application
│   ├── src/
│   │   ├── application/        # Application layer (Use Cases)
│   │   ├── domain/             # Domain layer (Entities, Services, Repositories)
│   │   │   ├── entities/       # Domain entities
│   │   │   ├── repositories/   # Repository interfaces
│   │   │   └── services/       # Domain services
│   │   ├── infrastructure/     # Infrastructure layer
│   │   │   ├── config/         # Dependency injection
│   │   │   ├── database/       # MongoDB implementations
│   │   │   ├── services/       # Service implementations
│   │   │   └── web/            # Controllers and routes
│   │   ├── bot/                # Telegram bot
│   │   ├── middleware/         # Express middleware
│   │   ├── utils/              # Utilities
│   │   └── index.ts            # Server entry point
│   └── package.json
├── app/                       # Next.js application (frontend + API routes)
│   ├── page.tsx               # Main UI page
│   ├── layout.tsx             # Root layout
│   ├── api/urls/route.ts      # API endpoint
│   └── globals.css            # Styles
└── README.md
```

## 🧪 Testing

### Test URL Analysis
```bash
cd server
npm run build
node dist/test-youtube-analysis.js
```

### Test API with Different Platforms
Use the provided `server/test-api.http` file to test various URL types:
- Facebook posts and videos
- Instagram posts and reels
- YouTube videos and shorts
- Threads posts

## 🎨 Features Showcase

### Smart Source Detection
- 📘 **Facebook**: Detects posts, videos, photos, events
- 📷 **Instagram**: Identifies posts, reels, stories, IGTV
- 🧵 **Threads**: Recognizes posts
- 📹 **YouTube**: Categorizes videos, shorts, playlists, channels

### Tag Management
- Add custom tags when saving URLs
- Visual tag display with color variations
- Organize content by topic or category

### Beautiful UI
- Source badges with platform colors
- Interactive tag pills
- Responsive card layout
- Smooth animations and transitions

## 🛠️ Development

### Development
```bash
npm run dev        # Start Next.js in development mode
npm run build      # Build for production
npm run start      # Start production build
npm run start-bot  # Launch Telegram bot
```

## 🔧 Troubleshooting

### Common Issues

1. **Bot not responding**: Check if the bot token is correct and the server is running
2. **Database connection error**: Ensure MongoDB is running and the connection string is correct
3. **CORS errors**: Ensure the Next.js server is running on the expected port
4. **URL previews not loading**: Some websites may block scraping; this is normal
5. **Source not detected**: Currently supports Facebook, Instagram, Threads, and YouTube URLs

### Logs

Check the server console for detailed error messages and bot activity logs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License. 