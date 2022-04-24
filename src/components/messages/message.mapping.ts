import { ObjectID } from 'typeorm';
import { UserOverviewDto } from '../users/@types/dto/UserOverviewDto';
import { MessageDto } from './@types/dto/MessageDto';
import { MessageReactionDto } from './@types/dto/MessageReaction.dto';
import { MessageReaderDto } from './@types/dto/MessageReader.dto';
import { Message } from './message.entity';

export class MessageDtoBuilder {
	id: ObjectID;
	conversationId: number;
	sender: UserOverviewDto;
	content: string;
	reactions: MessageReactionDto[];
	readers: MessageReaderDto[];
	status: string;
	type: string;
	createdAt: Date;

	constructor() {}

	public setMessage(message: Message): MessageDtoBuilder {
		this.id = message.id;
		this.conversationId = message.conversationId;
		this.content = message.content;
		this.status = message.status;
		this.type = message.type;
		this.createdAt = message.createdAt;
		return this;
	}

	public setSender(user: UserOverviewDto): MessageDtoBuilder {
		this.sender = user;
		return this;
	}

	public setReactionsDto(reactions: MessageReactionDto[]): MessageDtoBuilder {
		this.reactions = reactions;
		return this;
	}

	public setReadersDto(readers: MessageReaderDto[]): MessageDtoBuilder {
		this.readers = readers;
		return this;
	}

	public build(): MessageDto {
		return {
			id: this.id.toString(),
			conversationId: this.conversationId,
			sender: this.sender,
			content: this.content,
			reactions: this.reactions,
			readers: this.readers,
			status: this.status,
			type: this.type,
			createdAt: this.createdAt
		};
	}
}
