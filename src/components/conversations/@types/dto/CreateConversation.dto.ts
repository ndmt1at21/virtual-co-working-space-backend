import { Expose } from 'class-transformer';
import { IsArray, IsDefined, Length } from 'class-validator';

export class CreateConversationDto {
	officeId: number;

	@IsDefined()
	@Length(1, 255)
	@Expose()
	name: string;

	@IsDefined()
	@IsArray()
	@Expose()
	memberIds: number[];

	creatorId: number;
}
