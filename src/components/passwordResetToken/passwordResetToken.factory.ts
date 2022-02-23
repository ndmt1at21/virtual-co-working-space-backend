import { getCustomRepository } from 'typeorm';
import { PasswordResetTokenRepository } from './passwordResetToken.repository';
import { PasswordResetTokenService } from './passwordResetToken.service';

export const createPasswordResetTokenService = () => {
	const passwordResetTokenRepository = getCustomRepository(
		PasswordResetTokenRepository
	);

	return PasswordResetTokenService(passwordResetTokenRepository);
};
