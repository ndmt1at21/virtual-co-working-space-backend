import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { ActiveUserToken } from './activeUserToken.entity';

@EntityRepository(ActiveUserToken)
export class ActiveUserTokenRepository extends BaseRepository<ActiveUserToken> {
	async findByToken(token: string): Promise<ActiveUserToken | undefined> {
		return await this.findOne({
			where: {
				token
			}
		});
	}

	async deleteByToken(token: string): Promise<number> {
		const result = await this.createQueryBuilder()
			.delete()
			.where('token = :token', { token })
			.execute();

		return result.affected || 0;
	}

	async findByUserIdAndToken(
		userId: number,
		token: string
	): Promise<ActiveUserToken | undefined> {
		return await this.findOne({
			where: {
				userId,
				token
			}
		});
	}
}
