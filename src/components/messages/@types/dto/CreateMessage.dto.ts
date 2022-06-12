import { Expose } from 'class-transformer';
import {
	IsDefined,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator';
import { MessageType } from '../MessageType';

export class CreateMessageDto {
	@IsDefined()
	@IsNumber()
	@Expose()
	conversationId: number;

	@IsDefined()
	@IsString()
	@Expose()
	tempId: string;

	@IsDefined()
	@MaxLength(20000)
	@Expose()
	content: string;

	@IsOptional()
	@IsEnum(MessageType)
	@Expose()
	type?: MessageType;

	senderId: number;
}
