import { getCustomRepository } from 'typeorm';
import { MessageReceiverRepository } from './messageReceiver.repository';

export function createMessageReceiverRepository() {
	return getCustomRepository(MessageReceiverRepository);
}
