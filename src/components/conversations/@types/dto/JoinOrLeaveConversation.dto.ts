import { Expose } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class JoinOrLeaveConversationDto {
	@IsDefined()
	@IsNumber()
	@Expose()
	conversationId: number;
}
