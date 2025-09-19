export const colors = {
    brightGreen: '\x1b[92m',
    yellow:      '\x1b[33m',
    purple:      '\x1b[35m',
    green:       '\x1b[32m',
    cyan:        '\x1b[36m',
    blue:        '\x1b[34m',
    red:         '\x1b[91;1m',


    fatal:       '\x1b[97;41m',
    bold:        '\x1b[1m',
    clear:       '\x1b[0m',
};

const statusList = {
    debug: `${colors.purple}DEBUG${colors.clear}`,
    info: `${colors.brightGreen}INFO${colors.clear}`,
    warn: `${colors.yellow}WARN${colors.clear}`,
    error: `${colors.red}ERROR${colors.clear}`,
    fatal: `${colors.fatal}FATAL${colors.clear}`,

    dinfo:  `${colors.purple}DEBUG${colors.clear} ${colors.brightGreen}INFO${colors.clear}`,
    dwarn:  `${colors.purple}DEBUG${colors.clear} ${colors.yellow}WARN${colors.clear}`,
    derror: `${colors.purple}DEBUG${colors.clear} ${colors.red}ERROR${colors.clear}`
}


export class Logger {
    timeFormatter: (date?: Date | number) => string;
    entryPoint: string;
    displayDebugMessage: boolean
    constructor(entryPoint: string){
        // @ts-expect-error Not sure why it complains since that is correct.
        this.timeFormatter = new Intl.DateTimeFormat('en-US',{dateStyle: 'short','timeStyle': 'medium','hourCycle':'h24'}).format;
        this.entryPoint = entryPoint;
        this.displayDebugMessage = false;
    }

    templateLog(status: string,text: string,extendedEntries?: string | string[],log=true){
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
        if (newlineCount == 1){
            logMessage += text;
        } else {
            const splitText = text.split("\n");
            const tempLog = logMessage.split("");
            tempLog[0] = "┌";
            logMessage = tempLog.join("");
            logMessage += "\n"

            splitText.forEach((text,i) => {
                if (i+1 == splitText.length) {
                    logMessage += `└ ${text}`
                } else {
                    logMessage += `├ ${text}\n` 
                }
            })
        }
        
        if (log) {
            console.log(logMessage);
        } else {
            return logMessage;
        }
    }

    templateDebugLog(status: string,text: string,extendedEntries?: string | string[],log=true){
        if (!this.displayDebugMessage) return;
        if (log){
            this.templateLog(status,text,extendedEntries);
        } else {
            return this.templateLog(status,text,extendedEntries,log);
        }
        
    }

    info(text: string,extendedEntries?: string | string[]){
        this.templateLog(statusList.info,text,extendedEntries)
    }
    warn(text: string,extendedEntries?: string | string[]){
        this.templateLog(statusList.warn,text,extendedEntries)
    }
    error(text: string,extendedEntries?: string | string[]){
        this.templateLog(statusList.error,text,extendedEntries)
    }
    fatal(text: string,extendedEntries?: string | string[]){
        throw new Error(this.templateLog(statusList.fatal,text,extendedEntries,false))
    }

    dinfo(text: string,extendedEntries?: string | string[]){
        this.templateDebugLog(statusList.dinfo,text,extendedEntries)
    }
    dwarn(text: string,extendedEntries?: string | string[]){
        this.templateDebugLog(statusList.dwarn,text,extendedEntries)
    }
    derror(text: string,extendedEntries?: string | string[]){
        this.templateDebugLog(statusList.derror,text,extendedEntries)
    }
}