import { Request, Response, NextFunction } from 'express';
import { setRequestId, logger } from '../utils/logger';

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const requestId = Math.random().toString(36).substring(2, 15);
    
    // Add request ID to request object for use throughout the flow
    (req as any).requestId = requestId;
    
    // Set request ID in global context
    setRequestId(req);
    
    // Log request start
    logger.info('Request started:', `${req.method} ${req.path}`);
    
    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any): Response {
        const duration = Date.now() - start;
        const status = res.statusCode;
        
        // Get HTTP status text
        const statusText = res.statusMessage || getStatusText(status);
        
        // Enhanced end log with more details
        let endMessage = `${req.method} ${req.path} - Status code: ${status} ${statusText} (${duration}ms)`;
        
        // Add specific details for different status codes
        if (status === 400) {
            endMessage += ' - Validation Error';
        } else if (status === 404) {
            endMessage += ' - Not Found';
        } else if (status === 429) {
            endMessage += ' - Rate Limited';
        } else if (status === 500) {
            endMessage += ' - Server Error';
        }
        
        // Use appropriate log level based on status
        if (status >= 400) {
            logger.error('Request ended:', endMessage);
        } else {
            logger.info('Request ended:', endMessage);
        }
        
        return originalEnd.call(this, chunk, encoding);
    };
    
    next();
};

// Helper function to get HTTP status text
function getStatusText(statusCode: number): string {
    const statusTexts: { [key: number]: string } = {
        200: 'OK',
        201: 'Created',
        204: 'No Content',
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        409: 'Conflict',
        422: 'Unprocessable Entity',
        429: 'Too Many Requests',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable'
    };
    return statusTexts[statusCode] || 'Unknown';
}

export default loggingMiddleware; 