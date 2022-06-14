import { PushTokenDevice } from '../PushTokenDevice';

export type PushTokenDto = {
	id: number;
	userId: number;
	pushToken: string;
	deviceType: PushTokenDevice;
	expiredAt: Date;
};
