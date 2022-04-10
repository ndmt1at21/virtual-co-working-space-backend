export type RateLimitingOptions = {
	timeMs: number;
	maxPerIp: number;
	errMessage?: string;
};
