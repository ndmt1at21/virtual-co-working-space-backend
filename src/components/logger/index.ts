import { createLogger, format, transports } from 'winston';

const debugFormat = format.combine(
	format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	format.align(),
	format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const defaultFormat = format.combine(
	format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	format.json()
);

const commonOptions = {
	filename: 'logs/log.log',
	format: defaultFormat,
	maxFiles: 100,
	maxsize: 10 * 1024 * 1024
};

const debugOptions = {
	format: debugFormat,
	level: 'debug'
};

export const serverLogger = createLogger({
	defaultMeta: 'server',
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const userLogger = createLogger({
	defaultMeta: 'user-service',
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const authLogger = createLogger({
	defaultMeta: 'auth-service',
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const messageService = createLogger({
	defaultMeta: 'message-service',
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});
