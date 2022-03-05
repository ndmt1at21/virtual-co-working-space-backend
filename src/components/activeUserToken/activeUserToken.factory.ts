import { getCustomRepository } from 'typeorm';
import { ActiveUserTokenRepository } from './activeUserToken.repository';
import { ActiveUserTokenService } from './activeUserToken.service';

export const createActiveUserTokenService = () => {
	const activeUserTokenRepository = getCustomRepository(
		ActiveUserTokenRepository,
		'main'
	);

	return ActiveUserTokenService(activeUserTokenRepository);
};
