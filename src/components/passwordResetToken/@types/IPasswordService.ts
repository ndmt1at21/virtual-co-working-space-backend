import { PasswordResetTokenDto } from './dto/PasswordResetToken.dto';

export interface IPasswordResetTokenService {
	findByToken: (token: string) => Promise<PasswordResetTokenDto>;

	createToken: (userId: number) => Promise<PasswordResetTokenDto>;

	validatePasswordResetToken: (token: string) => Promise<boolean>;

	deleteByUserId: (userId: number) => Promise<void>;
}
