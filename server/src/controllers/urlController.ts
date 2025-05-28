import { Request, Response } from 'express';
import Url, { IUrl } from '../models/Url';
import axios from 'axios';
import * as cheerio from 'cheerio';
import logger from '../utils/logger';

// Get URL metadata (title, description, image)
async function getUrlMetadata(url: string) {
  try {
    logger.debug(`Fetching metadata for URL: ${url}`);
    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; URL-Saver-Bot/1.0)'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    const title = $('title').text() || $('meta[property="og:title"]').attr('content') || '';
    const description = $('meta[name="description"]').attr('content') || 
                        $('meta[property="og:description"]').attr('content') || '';
    const image = $('meta[property="og:image"]').attr('content') || '';
    
    logger.debug(`Metadata extracted for ${url}: title="${title}", description="${description?.substring(0, 50)}...", image="${image}"`);
    
    return { title, description, image };
  } catch (error) {
    logger.warn(`Error fetching URL metadata for ${url}: ${error}`);
    return { title: '', description: '', image: '' };
  }
}

// Add a new URL
export const addUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      logger.warn('URL add request missing URL parameter');
      return res.status(400).json({ message: 'URL is required' });
    }
    
    logger.info(`Adding new URL: ${url}`);
    
    // Check if URL already exists
    const existingUrl = await Url.findOne({ url });
    if (existingUrl) {
      logger.info(`URL already exists in database: ${url}`);
      return res.status(200).json(existingUrl);
    }
    
    // Get metadata
    const metadata = await getUrlMetadata(url);
    
    // Create new URL
    const newUrl = new Url({
      url,
      ...metadata
    });
    
    await newUrl.save();
    
    logger.info(`URL saved successfully: ${url} (ID: ${newUrl._id})`);
    return res.status(201).json(newUrl);
  } catch (error) {
    logger.error(`Error adding URL: ${error}`);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all URLs
export const getUrls = async (req: Request, res: Response) => {
  try {
    logger.debug('Fetching all URLs from database');
    const urls = await Url.find().sort({ createdAt: -1 });
    logger.info(`Retrieved ${urls.length} URLs from database`);
    return res.status(200).json(urls);
  } catch (error) {
    logger.error(`Error getting URLs: ${error}`);
    return res.status(500).json({ message: 'Server error' });
  }
}; 