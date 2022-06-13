import { Expose, Type } from 'class-transformer';
import { IsDefined, IsEnum, IsString } from 'class-validator';
import { PushTokenDevice } from '../PushTokenDevice';

export class CreatePushTokenDto {
	@IsDefined()
	@IsString()
	@Expose()
	pushToken: string;

	@IsDefined()
	@IsString()
	@Expose()
	@IsEnum(PushTokenDevice)
	device: PushTokenDevice;

	userId: number;
}
