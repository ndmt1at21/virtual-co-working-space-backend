import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from '@components/base/BaseRepository';
import { RefreshToken } from './refreshToken.entity';
import { RefreshTokenStatus } from './@types/RefreshTokenStatus';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
	async existsTokenByUserId(userId: number): Promise<boolean> {
		const count = await this.count({
			where: {
				userId
			}
		});

		return count === 1;
	}

	async findByTokenAndUserId(
		userId: number,
		token: string
	): Promise<RefreshToken | undefined> {
		return await this.findOne({
			where: {
				userId,
				token
			}
		});
	}

	async findByToken(token: string): Promise<RefreshToken | undefined> {
		return await this.findOne({
			where: {
				token
			}
		});
	}

	async deleteByToken(token: string): Promise<void> {
		await this.softDelete({
			token
		});
	}

	async blockByToken(token: string): Promise<void> {
		await this.update(
			{
				token
			},
			{
				status: RefreshTokenStatus.BLOCKED
			}
		);
	}
}
