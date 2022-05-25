import { IsArray, IsDefined, IsNumber } from 'class-validator';

export class CreateNotificationDto {
	@IsDefined()
	@IsNumber()
	entityTypeId: number;

	@IsDefined()
	@IsNumber()
	entityId: number;

	@IsDefined()
	@IsNumber()
	actorId: number;

	@IsDefined()
	@IsArray()
	notifiers: number[];
}
