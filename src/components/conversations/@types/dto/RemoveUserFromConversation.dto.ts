import { Expose } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class RemoveUserFromConversationDto {
	@IsDefined()
	@IsNumber()
	@Expose()
	userId: number;

	conversationId: number;
}
