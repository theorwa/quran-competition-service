import { Request, Response, NextFunction } from 'express';
import { setRequestId } from '../utils/logger';

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const requestId = Math.random().toString(36).substring(2, 15);
    
    // Add request ID to request object for use throughout the flow
    (req as any).requestId = requestId;
    
    // Set request ID in global context
    setRequestId(req);
    
    // Log request start
    console.log(`[${new Date().toISOString()}] [${requestId}] START  ${req.method} ${req.path}`);
    
    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any): Response {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const logLevel = status >= 400 ? 'ERROR' : 'INFO';
        
        console.log(`[${new Date().toISOString()}] [${requestId}] END    ${req.method} ${req.path} - ${status} (${duration}ms) - ${logLevel}`);
        
        return originalEnd.call(this, chunk, encoding);
    };
    
    next();
};

export default loggingMiddleware; 