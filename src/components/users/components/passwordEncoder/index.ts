import config from '@src/config';
import { hashSync } from 'bcrypt';

export const PasswordEncoder = () => {
	const encode = (password: string): string => {
		const encryptedPassword = hashSync(
			password,
			config.auth.BCRYPT_SALT_ROUNDS
		);

		return encryptedPassword;
	};

	return { encode };
};
