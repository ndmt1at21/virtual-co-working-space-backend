import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { ActiveUserToken } from './activeUserToken.entity';

@EntityRepository(ActiveUserToken)
export class ActiveUserTokenRepository extends BaseRepository<ActiveUserToken> {
	async findByToken(token: string): Promise<ActiveUserToken | undefined> {
		return await this.createQueryBuilder('active_user_token')
			.where('active_user_token.token = :token', { token })
			.getOne();
	}

	async deleteByToken(token: string): Promise<number> {
		const result = await this.createQueryBuilder('active_user_token')
			.where('active_user_token.token = :token', { token })
			.delete()
			.execute();

		return result.affected || 0;
	}

	async findByUserIdAndToken(
		userId: number,
		token: string
	): Promise<ActiveUserToken | undefined> {
		return await this.createQueryBuilder('active_user_token')
			.where('active_user_token.token = :token', { token })
			.andWhere('active_user_token.user_id = :userId', { userId })
			.getOne();
	}
}
