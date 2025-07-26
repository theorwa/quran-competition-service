import { Request, Response, NextFunction } from 'express';

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    
    // Log request start
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Started`);
    
    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any): Response {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const logLevel = status >= 400 ? 'ERROR' : 'INFO';
        
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${status} (${duration}ms) - ${logLevel}`);
        
        return originalEnd.call(this, chunk, encoding);
    };
    
    next();
};

export default loggingMiddleware; 