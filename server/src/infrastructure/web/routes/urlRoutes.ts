import express from 'express';
import { UrlController } from '../controllers/UrlController';

export function createUrlRoutes(urlController: UrlController): express.Router {
  const router = express.Router();

  // Bind methods to preserve 'this' context
  router.post('/', (req, res) => urlController.addUrl(req, res));
  router.get('/', (req, res) => urlController.getUrls(req, res));

  return router;
} 