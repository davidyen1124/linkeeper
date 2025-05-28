import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

// Morgan-like request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log the incoming request
  logger.http(`${req.method} ${req.originalUrl} - ${req.ip} - User-Agent: ${req.get('User-Agent')}`);
  
  // Override res.end to log response details
  const originalEnd = res.end.bind(res);
  res.end = function(chunk?: any, encoding?: any, cb?: any): Response {
    const duration = Date.now() - start;
    const contentLength = res.get('Content-Length') || 0;
    
    // Log the response
    logger.http(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms - ${contentLength} bytes`
    );
    
    // Call the original end method and return the result
    return originalEnd(chunk, encoding, cb);
  };
  
  next();
}; 