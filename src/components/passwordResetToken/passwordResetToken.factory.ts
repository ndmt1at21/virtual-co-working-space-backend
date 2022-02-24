import { getCustomRepository } from 'typeorm';
import { PasswordResetTokenCreator } from './passwordResetToken.creator';
import { PasswordResetTokenRepository } from './passwordResetToken.repository';
import { PasswordResetTokenService } from './passwordResetToken.service';

export const createPasswordResetTokenService = () => {
	const passwordResetTokenRepository = getCustomRepository(
		PasswordResetTokenRepository
	);
	const passwordResetTokenCreator = createPasswordResetTokenCreator();

	return PasswordResetTokenService(
		passwordResetTokenRepository,
		passwordResetTokenCreator
	);
};

export const createPasswordResetTokenCreator = () => {
	return PasswordResetTokenCreator();
};
