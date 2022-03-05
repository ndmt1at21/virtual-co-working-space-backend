import { getCustomRepository } from 'typeorm';
import { PasswordResetTokenCreator } from './passwordResetToken.creator';
import { PasswordResetTokenRepository } from './passwordResetToken.repository';
import { PasswordResetTokenService } from './passwordResetToken.service';

export const createPasswordResetTokenRepository = () => {
	const passwordResetTokenRepository = getCustomRepository(
		PasswordResetTokenRepository,
		'main'
	);

	return passwordResetTokenRepository;
};

export const createPasswordResetTokenService = () => {
	const passwordResetTokenRepository = createPasswordResetTokenRepository();
	const passwordResetTokenCreator = createPasswordResetTokenCreator();

	return PasswordResetTokenService(
		passwordResetTokenRepository,
		passwordResetTokenCreator
	);
};

export const createPasswordResetTokenCreator = () => {
	return PasswordResetTokenCreator();
};
