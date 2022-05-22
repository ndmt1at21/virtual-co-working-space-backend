import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { PushTokenDevice } from '../PushTokenDevice';

export class CreatePushTokenDto {
	@IsDefined()
	@IsString()
	@Expose()
	pushToken: string;

	userId: number;

	device: PushTokenDevice;
}
