import { Expose } from 'class-transformer';
import { IsDefined, IsIn, MaxLength } from 'class-validator';
import { MessageType } from '../MessageType';

export class CreateMessageDto {
	@IsDefined()
	@Expose()
	conversationId: number;

	@Expose()
	senderId: number;

	@IsDefined()
	@MaxLength(20000)
	@Expose()
	content: string;

	@IsDefined()
	@IsIn([
		MessageType.TEXT,
		MessageType.IMAGE,
		MessageType.VIDEO,
		MessageType.STICKER
	])
	@Expose()
	type: MessageType;
}
