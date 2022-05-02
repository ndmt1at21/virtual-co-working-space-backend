import { getCustomRepository } from 'typeorm';
import { MessageReaderRepository } from './messageReader.repository';

export function createMessageReaderRepository() {
	return getCustomRepository(MessageReaderRepository);
}
