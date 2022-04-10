import { BaseRepository } from '@src/components/base/BaseRepository';
import { AuthTracking } from './authTracking.entity';

export class AuthTrackingRepository extends BaseRepository<AuthTracking> {
	async updateLastLoginByUserId(userId: number, lastLogin: Date) {
		return await this.createQueryBuilder()
			.update()
			.where('userId = :userId', { userId })
			.set({ lastLogin })
			.execute();
	}

	async updateLastLogoutByUserId(userId: number, lastLogout: Date) {
		return await this.createQueryBuilder()
			.update()
			.where('userId = :userId', { userId })
			.set({ lastLogout })
			.execute();
	}
}
