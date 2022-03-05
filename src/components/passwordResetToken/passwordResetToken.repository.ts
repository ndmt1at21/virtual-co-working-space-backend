import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
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

	async deleteByUserId(userId: string): Promise<void> {
		await this.softDelete({ userId });
	}
}
