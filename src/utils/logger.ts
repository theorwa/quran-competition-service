import { Request } from 'express';
import { AsyncLocalStorage } from 'async_hooks';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

// Async context for request tracking
const asyncLocalStorage = new AsyncLocalStorage<string>();

export class Logger {
    private log(level: LogLevel, message: string, ...args: any[]): void {
        const timestamp = new Date().toISOString();
        const requestId = asyncLocalStorage.getStore() || 'NO_ID';
        const formattedMessage = args.length > 0 ? `${message} ${args.join(' ')}` : message;
        console.log(`[${timestamp}] [${requestId}] ${level.padEnd(5)} ${formattedMessage}`);
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