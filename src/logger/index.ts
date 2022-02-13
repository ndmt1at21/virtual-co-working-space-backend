import { createLogger, format, transports } from 'winston';

const customFormat = format.combine(
	format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	format.align(),
	format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

export const consoleLogger = createLogger({
	transports: [new transports.Console({ format: customFormat })]
});

export const serverLogger = createLogger({
	transports: [
		new transports.File({
			filename: 'logs/serverLog.log',
			format: customFormat
		})
	]
});

export const userLogger = createLogger({
	transports: [
		new transports.File({
			filename: 'logs/usersLog.log',
			format: customFormat
		})
	]
});

export const authLogger = createLogger({
	transports: [
		new transports.File({
			filename: 'logs/authLogger.log',
			format: customFormat
		})
	]
});
