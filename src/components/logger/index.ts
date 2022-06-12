import { createLogger, format, transports } from 'winston';

const debugFormat = format.combine(
	format(info => ({ ...info, level: info.level.toUpperCase() }))(),
	format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	format.align(),
	format.colorize(),
	format.printf(
		info =>
			`${info.timestamp} ${info.level} ${info.service}: ${info.message}`
	)
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

export const mailLogger = createLogger({
	defaultMeta: { service: 'mail-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const officeLogger = createLogger({
	defaultMeta: { service: 'office-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const officeItemLogger = createLogger({
	defaultMeta: { service: 'office-items-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const cloudLogger = createLogger({
	defaultMeta: { service: 'cloud-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const messageSocketLogger = createLogger({
	defaultMeta: { service: 'message-socket-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const officeMemberSocketLogger = createLogger({
	defaultMeta: { service: 'office-member-socket-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const itemLogger = createLogger({
	defaultMeta: { service: 'item-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const itemCategoryLogger = createLogger({
	defaultMeta: { service: 'item-category-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const officeInvitationLogger = createLogger({
	defaultMeta: { service: 'office-invitation-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const checkinLogger = createLogger({
	defaultMeta: { service: 'check-in-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const pushNotificationLogger = createLogger({
	defaultMeta: { service: 'push-notification-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});

export const conversationSocketLogger = createLogger({
	defaultMeta: { service: 'conversation-socket-service' },
	transports: [
		new transports.File(commonOptions),
		new transports.Console(debugOptions)
	]
});
