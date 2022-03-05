import { IllegalArgumentError } from '@src/utils/appError';
import { CreateUserDto } from './@types/dto/CreateUser.dto';
import { UpdatePasswordDto } from './@types/dto/UpdatePassword.dto';
import { IUserValidate } from './@types/IUserValidate';
import { UserErrorMessage } from './user.error';
import { UserRepository } from './user.repository';

export const UserValidate = (userRepository: UserRepository): IUserValidate => {
	const checkCreateUserData = async (data: CreateUserDto): Promise<void> => {
		const { email, password, passwordConfirm } = data;

		await checkPasswordMatch(password, passwordConfirm);
		await checkUniqueEmail(email);
	};

	const checkUpdatePasswordData = async (
		userId: string,
		data: UpdatePasswordDto
	) => {
		const { password, confirmPassword } = data;
		await checkUserExistsById(userId);
		await checkPasswordMatch(password, confirmPassword);
	};

	const checkUserExistsById = async (id: string) => {
		const isIdExists = await userRepository.existsUserById(id);

		if (!isIdExists) {
			throw new IllegalArgumentError(UserErrorMessage.USER_NOT_FOUND);
		}
	};

	const checkUserExistsByEmail = async (email: string) => {
		const isEmailExists = await userRepository.existsUserByEmail(email);

		if (!isEmailExists) {
			throw new IllegalArgumentError(UserErrorMessage.USER_NOT_FOUND);
		}
	};

	const checkUniqueEmail = async (email: string) => {
		const isEmailExists = await userRepository.existsUserByEmail(email);

		if (isEmailExists) {
			throw new IllegalArgumentError(
				UserErrorMessage.REGISTRATION_EMAIL_EXISTED
			);
		}
	};

	const checkPasswordMatch = (password: string, confirmPassword: string) => {
		if (password !== confirmPassword) {
			throw new IllegalArgumentError(
				UserErrorMessage.REGISTRATION_MISMATCH_PASSWORD
			);
		}
	};

	return {
		checkCreateUserData,
		checkUpdatePasswordData,
		checkUserExistsById,
		checkUserExistsByEmail
	};
};
