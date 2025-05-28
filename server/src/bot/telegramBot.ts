import { Telegraf, Context } from 'telegraf';
import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

// Check if Telegram bot token is set
const botToken = process.env.TELEGRAM_BOT_TOKEN;
if (!botToken) {
  logger.error('TELEGRAM_BOT_TOKEN must be provided in environment variables');
  throw new Error('TELEGRAM_BOT_TOKEN must be provided in environment variables');
}

// Create bot instance
const bot = new Telegraf(botToken);

// URL validation regex
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

// Start handler
bot.start((ctx) => {
  const userId = ctx.from?.id;
  const username = ctx.from?.username || 'Unknown';
  logger.info(`Bot started by user: ${username} (ID: ${userId})`);
  ctx.reply('Welcome to URL Saver Bot! Send me any URL, and I will save it for you.');
});

// Help handler
bot.help((ctx) => {
  const userId = ctx.from?.id;
  const username = ctx.from?.username || 'Unknown';
  logger.info(`Help requested by user: ${username} (ID: ${userId})`);
  ctx.reply('Simply send me any URL, and I will save it to your collection.');
});

// URL handler
bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  const userId = ctx.from?.id;
  const username = ctx.from?.username || 'Unknown';
  
  logger.debug(`Message received from ${username} (ID: ${userId}): ${text}`);
  
  // Check if the message contains a URL
  if (urlRegex.test(text)) {
    try {
      // Extract the URL from the message
      const url = text.match(urlRegex)?.[0] || '';
      
      logger.info(`Processing URL from ${username}: ${url}`);
      
      // Send URL to API
      const apiUrl = process.env.API_URL || 'http://localhost:4000/api/urls';
      await axios.post(apiUrl, { url });
      
      logger.info(`URL saved successfully: ${url}`);
      ctx.reply(`✅ URL saved successfully: ${url}`);
    } catch (error) {
      logger.error(`Error saving URL from ${username}: ${error}`);
      ctx.reply('❌ Failed to save URL. Please try again.');
    }
  } else {
    logger.debug(`Non-URL message from ${username}: ${text}`);
    ctx.reply('Please send a valid URL.');
  }
});

// Error handling
bot.catch((err, ctx) => {
  const userId = ctx.from?.id;
  const username = ctx.from?.username || 'Unknown';
  logger.error(`Bot error for user ${username} (ID: ${userId}): ${err}`);
});

export const startBot = () => {
  try {
    bot.launch();
    logger.info('Telegram bot launched successfully');
    
    // Enable graceful stop
    process.once('SIGINT', () => {
      logger.info('Received SIGINT, stopping bot gracefully');
      bot.stop('SIGINT');
    });
    process.once('SIGTERM', () => {
      logger.info('Received SIGTERM, stopping bot gracefully');
      bot.stop('SIGTERM');
    });
  } catch (error) {
    logger.error(`Failed to launch Telegram bot: ${error}`);
    throw error;
  }
}; 