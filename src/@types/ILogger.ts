export interface ILogger {
	log(level: string, message: string): void;
	info(message: string): void;
	warn(message: string): void;
	error(message: string): void;
}
