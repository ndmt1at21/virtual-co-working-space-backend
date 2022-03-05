import { TooManyRequestError } from '@src/utils/appError';
import { NextFunction, Request, Response } from 'express';
import { createClient } from 'redis';
import { RateLimitingOptions } from './@types/RateLimitingOptions';
import { RateLimitErrorMessages } from './rateLimit.error';

const client = createClient();
client.connect();

client.on('connect', () => console.log('Redis for rate limiting is connected'));
client.on('error', err => console.log('Redis for rate limiting error: ', err));

export const rateLimiting = ({ timeMs, maxPerIp }: RateLimitingOptions) => {
	client.flushAll();

	return async (req: Request, res: Response, next: NextFunction) => {
		const ip =
			req.connection.remoteAddress ||
			(req.headers['x-forward-to'] as string) ||
			'127.0.0.1';

		const nRequest = await incrNumberRequestOfIp(ip);
		if (nRequest === 1) await expireNumberRequestOfIp(ip, timeMs);

		if (nRequest > maxPerIp) {
			next(
				new TooManyRequestError(
					RateLimitErrorMessages.RATE_LIMIT_EXCEEDED
				)
			);
		}

		res.json({
			message: 'Hello world',
			request: nRequest,
			ttl: await client.ttl(ip)
		});
	};
};

async function incrNumberRequestOfIp(ip: string): Promise<number> {
	return await client.incr(ip);
}

async function expireNumberRequestOfIp(
	ip: string,
	timeMs: number
): Promise<boolean> {
	return await client.expire(ip, timeMs / 1000);
}
