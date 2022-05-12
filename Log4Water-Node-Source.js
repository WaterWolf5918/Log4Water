const fs = require('fs');


class Log4Water{
	constructor(logDir){
		if (!fs.existsSync(`${logDir}/logs`)){
			fs.mkdirSync(`${logDir}/logs`);
		}
		this.logDir = logDir;
		this.date = new Date();
		this.sec = this.date.getSeconds();
		this.mins = this.date.getMinutes();
		this.hours = this.date.getHours();
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth() + 1;
		this.day = this.date.getDate();
		this.file = `${this.hours}:${this.mins}:${this.sec}`;
		this.fullfile = `${this.month}/${this.day}/${this.year} : ${this.hours}:${this.mins}:${this.sec}`;
		this.filename = `${this.month}-${this.day}-${this.year}_${this.hours}-${this.mins}-${this.sec}`;
		this.colors = {
			red: "\u001b[31m",
			green: "\u001b[32m",
			// yellow: "\u001b[33m",
			blue: "\u001b[38;5;27m",
			gray: "\u001b[38;5;250m",
			darkGray: "\u001b[25;1m",
			yellow: "\u001b[33m",
			reset: "\u001b[0m"
		};
	}

/**
	@param {string} text - The text to be logged [Hello World] 
	@param {string} type - The type of log [socket.connect, socket.event, etc]
*/
	log(text,type){
		if (type){console.log(`${this.colors.blue}┌──${this.colors.reset}[${this.file}] ${this.colors.blue}[Info]${this.colors.reset} [${type}]\n${this.colors.blue}└─${this.colors.reset}${text}\n`);fs.appendFileSync(`${this.logDir}/logs/${this.filename}.log`, `[${this.fullfile}] [Info] [${type}] | ${text}\n`);}
		else{
			console.log(`${this.colors.blue}┌──${this.colors.reset}[${this.file}] ${this.colors.blue}[Info]${this.colors.reset} \n${this.colors.blue}└─${this.colors.reset}${text}\n`);
			fs.appendFileSync(`${this.logDir}/logs/${this.filename}.log`, `[${this.fullfile}] [Info] | ${text}\n`);
		}
	}

/**
	@param {string} text - The text to be logged [Hello World] 
	@param {string} type - The type of log [socket.connect, socket.event, etc]
*/
	warn(text,type){
		if (type){console.log(`${this.colors.yellow}┌──${this.colors.reset}[${this.file}] ${this.colors.yellow}[Warn]${this.colors.reset} [${type}]\n${this.colors.yellow}└─${this.colors.reset}${text}\n`);fs.appendFileSync(`${this.logDir}/logs/${this.filename}.log`, `[${this.fullfile}] [Warn] [${type}] | ${text}\n`);}
		else{
			console.log(`${this.colors.yellow}┌──${this.colors.reset}[${this.file}] ${this.colors.yellow}[Warn]${this.colors.reset} \n${this.colors.yellow}└─${this.colors.reset}${text}\n`);
			fs.appendFileSync(`${this.logDir}/logs/${this.filename}.log`, `[${this.fullfile}] [Warn] | ${text}\n`);
		}
	}


/**
	@param {string} text - The text to be logged [Hello World] 
	@param {string} type - The type of log [socket.connect, socket.event, etc]
*/
error(text,type){
	if (type){console.log(`${this.colors.red}┌──${this.colors.reset}[${this.file}] ${this.colors.red}[Error]${this.colors.reset} [${type}]\n${this.colors.red}└─${this.colors.reset}${text}\n`);fs.appendFileSync(`${this.logDir}/logs/${this.filename}.log`, `[${this.fullfile}] [Error] [${type}] | ${text}\n`);}
	else{
		console.log(`${this.colors.red}┌──${this.colors.reset}[${this.file}] ${this.colors.red}[Error]${this.colors.reset} \n${this.colors.red}└─${this.colors.reset}${text}\n`);
		fs.appendFileSync(`${this.logDir}/logs/${this.filename}.log`, `[${this.fullfile}] [Error] | ${text}\n`);
	}
}




/**
	@param {string} text - The text to be logged [Hello World] 
	@param {string} type - The type of log [socket.connect, socket.event, etc]
	@param {string} level - The level of log [info, debug, error, etc]
*/

	print(text,level,type){
		if (!level){level = 'Info';}
		if(!type){
			console.log(`┌──[${this.file}] [${level}]\n└─${text}\n`);
			fs.appendFileSync(`${this.logDir}/logs/${this.filename}.log`, `[${this.fullfile}] [${level}] | ${text}\n`);
		}else{
			console.log(`┌──[${this.file}] [${level}] [${type}]\n└─${text}\n`);
			fs.appendFileSync(`${this.logDir}/logs/${this.filename}.log`, `[${this.fullfile}] [${level}] [${type}] | ${text}\n`);
		}
	}
}

module.exports = { Log4Water };