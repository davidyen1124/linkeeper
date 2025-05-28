import express from 'express';
import { addUrl, getUrls } from '../controllers/urlController';

const router = express.Router();

// Routes
router.post('/', addUrl);
router.get('/', getUrls);

export default router; 