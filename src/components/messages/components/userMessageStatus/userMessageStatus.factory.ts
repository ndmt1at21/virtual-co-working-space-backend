import { getCustomRepository } from 'typeorm';
import { UserMessageStatusRepository } from './userMessageStatus.repository';

export function createUserMessageStatusRepository() {
	return getCustomRepository(UserMessageStatusRepository);
}
