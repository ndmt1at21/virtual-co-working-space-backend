import { getCustomRepository } from 'typeorm';
import { PushTokenController } from './pushToken.controller';
import { PushTokenRepository } from './pushToken.repository';
import { PushTokenService } from './pushToken.service';

export function createPushTokenController() {
	const pushTokenService = createPushTokenService();
	return new PushTokenController(pushTokenService);
}

export function createPushTokenService() {
	const pushTokenRepository = createPushTokenRepository();
	return new PushTokenService(pushTokenRepository);
}

export function createPushTokenRepository() {
	return getCustomRepository(PushTokenRepository);
}
