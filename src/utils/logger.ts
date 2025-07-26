import { Request } from 'express';
import { AsyncLocalStorage } from 'async_hooks';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

// Log level hierarchy (higher number = more important)
const logLevels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
};

// Current log level (can be changed at runtime)
let currentLogLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'INFO';

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
};

// Color mapping for log levels
const levelColors = {
    DEBUG: colors.blue,
    INFO: colors.green,
    WARN: colors.yellow,
    ERROR: colors.red
};

// Async context for request tracking
const asyncLocalStorage = new AsyncLocalStorage<string>();

export class Logger {
    private shouldLog(level: LogLevel): boolean {
        return logLevels[level] >= logLevels[currentLogLevel];
    }

    private log(level: LogLevel, message: string, ...args: any[]): void {
        if (!this.shouldLog(level)) return;
        
        const timestamp = new Date().toISOString();
        const requestId = asyncLocalStorage.getStore() || 'NO_ID';
        const formattedMessage = args.length > 0 ? `${message} ${args.join(' ')}` : message;
        
        const color = levelColors[level];
        const logLine = `[${timestamp}] [${requestId}] ${level.padEnd(5)} ${formattedMessage}`;
        
        console.log(`${color}${logLine}${colors.reset}`);
    }

    debug(message: string, ...args: any[]): void {
        this.log('DEBUG', message, ...args);
    }

    info(message: string, ...args: any[]): void {
        this.log('INFO', message, ...args);
    }

    warn(message: string, ...args: any[]): void {
        this.log('WARN', message, ...args);
    }

    error(message: string, ...args: any[]): void {
        this.log('ERROR', message, ...args);
    }
}

// Global logger instance
export const logger = new Logger();

// Helper to set request ID in middleware
export const setRequestId = (req: Request): void => {
    const requestId = (req as any).requestId || 'NO_ID';
    asyncLocalStorage.enterWith(requestId);
};

// Runtime log level control
export const setLogLevel = (level: LogLevel): void => {
    currentLogLevel = level;
    logger.info(`Log level changed to: ${level}`);
};

export const getLogLevel = (): LogLevel => currentLogLevel; 