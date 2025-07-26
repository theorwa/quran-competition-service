import { Router, Request, Response } from 'express';
import { setLogLevel, getLogLevel } from '../utils/logger';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Log level control endpoint
router.post('/log-level', (req: Request, res: Response) => {
    const { level } = req.body;
    
    if (!level || !['DEBUG', 'INFO', 'WARN', 'ERROR'].includes(level)) {
        return res.status(400).json({ 
            error: 'Invalid log level. Use: DEBUG, INFO, WARN, or ERROR' 
        });
    }
    
    setLogLevel(level as any);
    res.json({ 
        message: `Log level changed to ${level}`,
        currentLevel: getLogLevel()
    });
});

// Get current log level
router.get('/log-level', (req: Request, res: Response) => {
    res.json({ 
        currentLevel: getLogLevel() 
    });
});

export default router; 