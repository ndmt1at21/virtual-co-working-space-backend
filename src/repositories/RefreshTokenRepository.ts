import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '@src/entities/RefreshToken';
import { BaseRepository } from './BaseRepository';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
	findByToken(token: string): Promise<RefreshToken | undefined> {
		return this.findOne({
			where: {
				token
			}
		});
	}
}
