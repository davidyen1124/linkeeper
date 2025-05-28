# 📎 URL Saver System

A system that consists of a Telegram bot and a website to save and display URLs with previews.

## Features

- 🤖 **Telegram Bot**: Listen to messages and save URLs automatically
- 🌐 **Web Interface**: Display saved URLs with beautiful previews
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Real-time Updates**: Automatically refresh URL list
- 🖼️ **URL Previews**: Show title, description, and images from URLs

## Tech Stack

### Backend (Server)
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **MongoDB** - Database for storing URLs
- **Telegraf** - Telegram bot framework
- **Cheerio** - Web scraping for URL metadata
- **Axios** - HTTP client

### Frontend (Client)
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool
- **Axios** - HTTP client for API calls

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Telegram Bot Token (from @BotFather)

### 1. Clone and Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
MONGODB_URI=mongodb://localhost:27017/url-saver
PORT=4000
API_URL=http://localhost:4000/api/urls
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

#### Start the Server (Backend + Telegram Bot)
```bash
cd server
npm run dev
```

#### Start the Client (React App)
```bash
cd client
npm run dev
```

The web interface will be available at `http://localhost:5173`

## Usage

1. **Start the Telegram Bot**: Send `/start` to your bot in Telegram
2. **Send URLs**: Send any URL to the bot, and it will be saved automatically
3. **View URLs**: Open the web interface to see all saved URLs with previews
4. **Refresh**: Click the refresh button or wait for automatic updates

## API Endpoints

- `GET /api/urls` - Get all saved URLs
- `POST /api/urls` - Save a new URL

## Project Structure

```
├── server/                 # Backend application
│   ├── src/
│   │   ├── bot/           # Telegram bot logic
│   │   ├── controllers/   # API controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Server entry point
│   └── package.json
├── client/                # Frontend application
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   ├── App.css        # Styles
│   │   └── main.tsx       # React entry point
│   └── package.json
└── README.md
```

## Development

### Server Development
```bash
cd server
npm run dev    # Start with hot reload
npm run build  # Build TypeScript
npm start      # Start production build
```

### Client Development
```bash
cd client
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Troubleshooting

### Common Issues

1. **Bot not responding**: Check if the bot token is correct and the server is running
2. **Database connection error**: Ensure MongoDB is running and the connection string is correct
3. **CORS errors**: Make sure both server and client are running on the specified ports
4. **URL previews not loading**: Some websites may block scraping; this is normal

### Logs

Check the server console for detailed error messages and bot activity logs.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 