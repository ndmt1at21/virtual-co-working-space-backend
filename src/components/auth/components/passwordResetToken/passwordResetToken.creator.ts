import { PasswordResetTokenDto } from './@types/dto/PasswordResetToken.dto';
import { PasswordResetToken } from './passwordResetToken.entity';

export const PasswordResetTokenCreator = () => {
	const mapPasswordResetTokenToPasswordResetTokenDto = (
		passwordResetTokenEntity: PasswordResetToken
	): PasswordResetTokenDto => {
		const {
			id,
			userId,
			passwordResetToken,
			passwordResetTokenExpired,
			createdAt
		} = passwordResetTokenEntity;

		return {
			id,
			userId,
			passwordResetToken,
			passwordResetTokenExpired,
			createdAt
		};
	};

	return { mapPasswordResetTokenToPasswordResetTokenDto };
};
