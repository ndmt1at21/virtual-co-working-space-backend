import { PasswordResetToken } from '../passwordResetToken.entity';
import { PasswordResetTokenDto } from './dto/PasswordResetToken.dto';

export interface IPasswordResetTokenCreator {
	mapPasswordResetTokenToPasswordResetTokenDto: (
		passwordResetTokenEntity: PasswordResetToken
	) => PasswordResetTokenDto;
}
