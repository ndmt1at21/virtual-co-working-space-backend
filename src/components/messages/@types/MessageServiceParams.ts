import { MessageReaderRepository } from '../components/messageReader/messageReader.repository';
import { MessageReceiverRepository } from '../components/messageReceiver/messageReceiver.repository';
import { UserMessageDeletedRepository } from '../components/userMessageDeleted/userMessageDeleted.repository';
import { MessageRepository } from '../message.repository';
import { IMessageValidate } from './IMessageValidate';

export type MessageServiceParams = {
	messageRepository: MessageRepository;
	messageValidate: IMessageValidate;
	userMessageDeletedRepository: UserMessageDeletedRepository;
	messageReaderRepository: MessageReaderRepository;
	messageReceiverRepository: MessageReceiverRepository;
};
