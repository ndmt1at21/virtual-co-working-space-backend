import { getCustomRepository } from 'typeorm';
import { MessageReaction } from './messageReaction.entity';

export function createMessageReactionRepository() {
	return getCustomRepository(MessageReaction);
}
