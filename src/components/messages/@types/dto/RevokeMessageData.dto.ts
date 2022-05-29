import { Expose } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class RevokeMessageData {
	@IsDefined()
	@IsNumber()
	@Expose()
	messageId: number;

	@IsDefined()
	@IsNumber()
	@Expose()
	conversationId: number;
}
