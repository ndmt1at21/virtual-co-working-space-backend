import { BaseRepository } from '../base/BaseRepository';
import { AuthTracking } from './authTracking.entity';

export class AuthTrackingRepository extends BaseRepository<AuthTracking> {
	async updateLastLoginByUserId(userId: string, lastLogin: Date) {
		return await this.createQueryBuilder()
			.update()
			.where('userId = :userId', { userId })
			.set({ lastLogin })
			.execute();
	}

	async updateLastLogoutByUserId(userId: string, lastLogout: Date) {
		return await this.createQueryBuilder()
			.update()
			.where('userId = :userId', { userId })
			.set({ lastLogout })
			.execute();
	}
}
