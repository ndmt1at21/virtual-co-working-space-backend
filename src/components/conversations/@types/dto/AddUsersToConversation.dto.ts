import { Expose, Type } from 'class-transformer';
import { IsArray, IsDefined, IsNumber } from 'class-validator';

export class AddUsersToConversationDto {
	@IsDefined()
	@IsArray({ each: true })
	@Type(() => Number)
	@Expose()
	userIds: number[];
}
