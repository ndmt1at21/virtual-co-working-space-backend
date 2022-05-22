export interface IPushNotificationService {
	checkPushTokenIsValid(pushToken: string): Promise<void>;
}
