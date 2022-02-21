import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from '@components/base/BaseRepository';
import { RefreshToken } from './refreshToken.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
	async existsTokenWithUserId(userId: number): Promise<boolean> {
		const count = await this.count({
			where: {
				userId
			}
		});

		return count === 1;
	}

	async findByToken(token: string): Promise<RefreshToken | undefined> {
		return await this.findOne({
			where: {
				token
			}
		});
	}
}
