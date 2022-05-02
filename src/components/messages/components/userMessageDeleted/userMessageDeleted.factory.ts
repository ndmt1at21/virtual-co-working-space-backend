import { getCustomRepository } from 'typeorm';
import { UserMessageDeletedRepository } from './userMessageDeleted.repository';

export function createUserMessageDeletedRepository() {
	return getCustomRepository(UserMessageDeletedRepository);
}
