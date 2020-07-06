const defaultConfig = {
	appenders: {
		console: {
			type: 'console',
			category: 'console'
		},
		file: {
			type: 'file',
			filename: `reports/log.log`,
			pattern: '%d{dd/MM hh:mm} %-5p %m'
		}
	},
	categories: {
		default: { appenders: ['console', 'file'], level: 'DEBUG' },
		console: { appenders: ['file'], level: 'DEBUG' }
	}
};

const log4js = require('log4js');
log4js.configure(defaultConfig);
export class Logger {
	private log;

	constructor(name: string) {
		this.log = log4js.getLogger(name);
	}

	debug(obj, takeScreenshot: boolean = true) {
			let logOutput;
		switch (typeof obj) {
			case 'string':
				logOutput = obj;
				this.log.debug(logOutput);
				break;

			case 'object':
				logOutput = JSON.stringify(obj, null, 2);
				this.log.debug(logOutput);
				break;

			default:
				break;
		}
	}

	error(obj) {
		switch (typeof obj) {
			case 'string':
				this.log.error(obj);
				break;

			case 'object':
				const message = JSON.stringify(obj, null, 2);
				this.log.error(message);
				break;

			default:
				break;
		}
	}
}
