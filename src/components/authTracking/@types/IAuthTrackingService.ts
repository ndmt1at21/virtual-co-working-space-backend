export interface IAuthTrackingService {
	createAuthTracking(userId: string): Promise<void>;

	updateLastLogin(userId: string): Promise<void>;

	updateLastLogout(userId: string): Promise<void>;
}
