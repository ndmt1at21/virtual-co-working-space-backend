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
	maxFiles: 1000,
	maxsize: 5 * 1024 * 1024
};

const debugOptions = {
	format: debugFormat,
	level: 'debug'
};

export const serverLogger = createLogger({
	defaultMeta: { service: 'server' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const userLogger = createLogger({
	defaultMeta: { service: 'user-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const authLogger = createLogger({
	defaultMeta: { service: 'auth-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const messageService = createLogger({
	defaultMeta: { service: 'message-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});
