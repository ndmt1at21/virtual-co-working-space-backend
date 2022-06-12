import { Expose } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class MarkMessagesAsReadDto {
	@IsDefined()
	@IsNumber()
	@Expose()
	conversationId: number;

	readerId: number;
}
