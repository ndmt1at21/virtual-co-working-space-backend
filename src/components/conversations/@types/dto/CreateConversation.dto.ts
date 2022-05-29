import { Expose } from 'class-transformer';
import { IsArray, IsDefined, Length } from 'class-validator';

export class CreateConversationDto {
	@IsDefined()
	@Expose()
	officeId: number;

	@IsDefined()
	@Length(1, 255)
	@Expose()
	name: string;

	@IsDefined()
	@IsArray({ each: true })
	@Expose()
	memberIds: number[];

	@Expose()
	creatorId: number;
}
