import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from '@components/base/BaseRepository';
import { RefreshToken } from './refreshToken.entity';

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
