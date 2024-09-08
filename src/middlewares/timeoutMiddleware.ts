import { Request, Response, NextFunction } from 'express';

const timeoutMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Set a timeout of 5 seconds (5000 milliseconds)
    const timeout = setTimeout(() => {
        res.status(503).json({ error: 'Request timed out' });
    }, 5000);

    // Once the request is finished, clear the timeout to prevent it from firing
    res.on('finish', () => clearTimeout(timeout));

    next();
};

export default timeoutMiddleware;
