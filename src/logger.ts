type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

function shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatMessage(level: LogLevel, component: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${component}] ${message}`;
}

/**
 * Lightweight logger that writes to stderr (MCP uses stdout for protocol).
 */
export const logger = {
    debug(component: string, message: string): void {
        if (shouldLog('debug')) {
            console.error(formatMessage('debug', component, message));
        }
    },

    info(component: string, message: string): void {
        if (shouldLog('info')) {
            console.error(formatMessage('info', component, message));
        }
    },

    warn(component: string, message: string): void {
        if (shouldLog('warn')) {
            console.error(formatMessage('warn', component, message));
        }
    },

    error(component: string, message: string): void {
        if (shouldLog('error')) {
            console.error(formatMessage('error', component, message));
        }
    },
};
