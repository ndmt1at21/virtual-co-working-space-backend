import { PasswordResetTokenDto } from './dto/PasswordResetToken.dto';

export interface IPasswordResetTokenService {
	findByPlainToken: (token: string) => Promise<PasswordResetTokenDto>;

	createToken: (userId: number) => Promise<PasswordResetTokenDto>;

	validateToken: (token: string) => Promise<boolean>;

	deleteByUserId: (userId: number) => Promise<void>;
}