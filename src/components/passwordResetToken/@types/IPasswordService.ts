import { PasswordResetTokenDto } from './dto/PasswordResetToken.dto';

export interface IPasswordResetTokenService {
	findByToken: (token: string) => Promise<PasswordResetTokenDto>;

	createToken: (userId: string) => Promise<PasswordResetTokenDto>;

	validateToken: (token: string) => Promise<boolean>;

	deleteByUserId: (userId: string) => Promise<void>;
}
