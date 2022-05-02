import { UserMessageStatusRepository } from '../components/userMessageStatus/userMessageStatus.repository';
import { MessageRepository } from '../message.repository';
import { IMessageValidate } from './IMessageValidate';

export type MessageServiceParams = {
	messageRepository: MessageRepository;
	messageValidate: IMessageValidate;
	userMessageStatusRepository: UserMessageStatusRepository;
};
