export interface IOfficeMemberCacheService {
	setUserSocket(userId: string, socketId: string): Promise<void>;

	getUserSocket(userId: string): Promise<string | null>;

	deleteUserSocket(userId: string): Promise<void>;
}
