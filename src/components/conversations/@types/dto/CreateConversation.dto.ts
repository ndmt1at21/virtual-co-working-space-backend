import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class CreateConversationDto {
	@IsDefined()
	@Expose()
	officeId: number;

	@Expose()
	creatorId: number;
}
