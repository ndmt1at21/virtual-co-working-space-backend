import { getCustomRepository } from 'typeorm';

export function createMessageRepository() {
	return getCustomRepository(MessageRepository);
}
