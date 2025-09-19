"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.colors = void 0;
exports.colors = {
    brightGreen: '\x1b[92m',
    yellow: '\x1b[33m',
    purple: '\x1b[35m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    blue: '\x1b[34m',
    red: '\x1b[91;1m',
    fatal: '\x1b[97;41m',
    bold: '\x1b[1m',
    clear: '\x1b[0m',
};
const statusList = {
    debug: `${exports.colors.purple}DEBUG${exports.colors.clear}`,
    info: `${exports.colors.brightGreen}INFO${exports.colors.clear}`,
    warn: `${exports.colors.yellow}WARN${exports.colors.clear}`,
    error: `${exports.colors.red}ERROR${exports.colors.clear}`,
    fatal: `${exports.colors.fatal}FATAL${exports.colors.clear}`,
    dinfo: `${exports.colors.purple}DEBUG${exports.colors.clear} ${exports.colors.brightGreen}INFO${exports.colors.clear}`,
    dwarn: `${exports.colors.purple}DEBUG${exports.colors.clear} ${exports.colors.yellow}WARN${exports.colors.clear}`,
    derror: `${exports.colors.purple}DEBUG${exports.colors.clear} ${exports.colors.red}ERROR${exports.colors.clear}`
};
class Logger {
    constructor(entryPoint) {
        // @ts-expect-error Not sure why it complains since that is correct.
        this.timeFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', 'timeStyle': 'medium', 'hourCycle': 'h24' }).format;
        this.entryPoint = entryPoint;
        this.displayDebugMessage = false;
    }
    templateLog(status, text, extendedEntries, log = true) {
        // | Status | Timestamp | Entry Point | Single Line
        let newlineCount = text.split("\n").length;
        let logMessage = ``;
        logMessage += `│ ${status} │ `;
        logMessage += `${this.timeFormatter(Date.now())} │ `;
        logMessage += `${this.entryPoint} │ `;
        if (extendedEntries) {
            // Make sure we always work with a array
            if (typeof extendedEntries !== "object") {
                const tempEntry = extendedEntries;
                extendedEntries = [tempEntry];
            }
            extendedEntries.forEach(entry => logMessage += `${entry} │ `);
        }
        if (newlineCount == 1) {
            logMessage += text;
        }
        else {
            const splitText = text.split("\n");
            const tempLog = logMessage.split("");
            tempLog[0] = "┌";
            logMessage = tempLog.join("");
            logMessage += "\n";
            splitText.forEach((text, i) => {
                if (i + 1 == splitText.length) {
                    logMessage += `└ ${text}`;
                }
                else {
                    logMessage += `├ ${text}\n`;
                }
            });
        }
        if (log) {
            console.log(logMessage);
        }
        else {
            return logMessage;
        }
    }
    templateDebugLog(status, text, extendedEntries, log = true) {
        if (!this.displayDebugMessage)
            return;
        if (log) {
            this.templateLog(status, text, extendedEntries);
        }
        else {
            return this.templateLog(status, text, extendedEntries, log);
        }
    }
    info(text, extendedEntries) {
        this.templateLog(statusList.info, text, extendedEntries);
    }
    warn(text, extendedEntries) {
        this.templateLog(statusList.warn, text, extendedEntries);
    }
    error(text, extendedEntries) {
        this.templateLog(statusList.error, text, extendedEntries);
    }
    fatal(text, extendedEntries) {
        throw new Error(this.templateLog(statusList.fatal, text, extendedEntries, false));
    }
    dinfo(text, extendedEntries) {
        this.templateDebugLog(statusList.dinfo, text, extendedEntries);
    }
    dwarn(text, extendedEntries) {
        this.templateDebugLog(statusList.dwarn, text, extendedEntries);
    }
    derror(text, extendedEntries) {
        this.templateDebugLog(statusList.derror, text, extendedEntries);
    }
}
exports.Logger = Logger;
