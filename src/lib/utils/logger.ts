const isServer = typeof window === 'undefined';

const colors = {
    reset: '\x1b[0m',
    blue: '\x1b[34m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    gray: '\x1b[90m',
    bold: '\x1b[1m',
};

export const logger = {
    info: (message: string, data?: any) => {
        if (isServer) {
            console.log(`${colors.blue}ℹ️ [INFO] ${message}${colors.reset}`);
            if (data) console.log(JSON.stringify(data, null, 2));
        } else {
            console.groupCollapsed(`%c ℹ️ [INFO] ${message}`, 'color: #3b82f6; font-weight: bold;');
            if (data) console.log(data);
            console.groupEnd();
        }
    },
    success: (message: string, data?: any) => {
        if (isServer) {
            console.log(`${colors.green}✅ [SUCCESS] ${message}${colors.reset}`);
            if (data) console.log(JSON.stringify(data, null, 2));
        } else {
            console.groupCollapsed(`%c ✅ [SUCCESS] ${message}`, 'color: #22c55e; font-weight: bold;');
            if (data) console.log(data);
            console.groupEnd();
        }
    },
    warn: (message: string, data?: any) => {
        if (isServer) {
            console.log(`${colors.yellow}⚠️ [WARN] ${message}${colors.reset}`);
            if (data) console.log(JSON.stringify(data, null, 2));
        } else {
            console.groupCollapsed(`%c ⚠️ [WARN] ${message}`, 'color: #eab308; font-weight: bold;');
            if (data) console.warn(data);
            console.groupEnd();
        }
    },
    error: (message: string, error?: any) => {
        if (isServer) {
            console.log(`${colors.red}❌ [ERROR] ${message}${colors.reset}`);
            if (error) console.error(error);
        } else {
            console.groupCollapsed(`%c ❌ [ERROR] ${message}`, 'color: #ef4444; font-weight: bold;');
            if (error) console.error(error);
            console.groupEnd();
        }
    },
    // Helper for interceptors
    group: (title: string, color = '#6b7280', serverColor = colors.gray) => {
        if (isServer) {
            console.log(`${serverColor}${colors.bold}${title}${colors.reset}`);
        } else {
            console.groupCollapsed(`%c ${title}`, `color: ${color}; font-weight: bold;`);
        }
    },
    groupEnd: () => {
        if (!isServer) {
            console.groupEnd();
        } else {
            console.log(`${colors.gray}----------------------------------------${colors.reset}`);
        }
    }
};
