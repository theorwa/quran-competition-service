import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
    [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    
    // Clean expired entries
    if (store[key] && now > store[key].resetTime) {
        delete store[key];
    }
    
    // Initialize or get current count
    if (!store[key]) {
        store[key] = { count: 0, resetTime: now + WINDOW_MS };
    }
    
    // Check limit
    if (store[key].count >= MAX_REQUESTS) {
        return res.status(429).json({ 
            error: 'Too many requests',
            retryAfter: Math.ceil((store[key].resetTime - now) / 1000)
        });
    }
    
    // Increment count
    store[key].count++;
    
    // Add headers
    res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
    res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - store[key].count);
    res.setHeader('X-RateLimit-Reset', store[key].resetTime);
    
    next();
};

export default rateLimitMiddleware; 