import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { PasswordResetToken } from './passwordResetToken.entity';

@EntityRepository(PasswordResetToken)
export class PasswordResetTokenRepository extends BaseRepository<PasswordResetToken> {
	async findByToken(
		resetToken: string
	): Promise<PasswordResetToken | undefined> {
		return await this.findOne({
			where: {
				passwordResetToken: resetToken
			}
		});
	}

	async deleteByUserId(userId: number): Promise<void> {
		await this.softDelete({ userId });
	}
}
