export interface IAuthTrackingService {
	createAuthTracking(userId: number): Promise<void>;

	updateLastLogin(userId: number): Promise<void>;

	updateLastLogout(userId: number): Promise<void>;
}
