import { Expose } from 'class-transformer';
import {
	IsDefined,
	IsEnum,
	IsNumber,
	IsOptional,
	MaxLength
} from 'class-validator';
import { MessageType } from '../MessageType';

export class CreateMessageDto {
	@IsDefined()
	@IsNumber()
	@Expose()
	conversationId: number;

	senderId: number;

	@IsDefined()
	@MaxLength(20000)
	@Expose()
	content: string;

	@IsOptional()
	@IsEnum(MessageType)
	@Expose()
	type?: MessageType;
}
