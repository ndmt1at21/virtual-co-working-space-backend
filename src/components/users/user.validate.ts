import { IllegalArgumentError } from '@src/utils/appError';
import { CreateUserDto } from './@types/dto/CreateUser.dto';
import { UpdatePasswordDto } from './@types/dto/UpdatePassword.dto';
import { IUserValidate } from './@types/IUserValidate';
import { UserErrorMessage } from './user.error';
import { UserRepository } from './user.repository';

export class UserValidate implements IUserValidate {
	constructor(private readonly userRepository: UserRepository) {}

	checkCreateUserData = async (data: CreateUserDto): Promise<void> => {
		const { email, password, passwordConfirm } = data;

		await this.checkPasswordMatch(password, passwordConfirm);
		await this.checkUniqueEmail(email);
	};

	checkUpdatePasswordData = async (
		userId: number,
		data: UpdatePasswordDto
	) => {
		const { password, confirmPassword } = data;
		await this.checkUserExistsById(userId);
		await this.checkPasswordMatch(password, confirmPassword);
	};

	checkUserExistsById = async (id: number) => {
		const isIdExists = await this.userRepository.existsUserById(id);

		if (!isIdExists) {
			throw new IllegalArgumentError(UserErrorMessage.USER_NOT_FOUND);
		}
	};

	checkUserExistsByEmail = async (email: string) => {
		const isEmailExists = await this.userRepository.existsUserByEmail(
			email
		);

		if (!isEmailExists) {
			throw new IllegalArgumentError(UserErrorMessage.USER_NOT_FOUND);
		}
	};

	checkUniqueEmail = async (email: string) => {
		const isEmailExists = await this.userRepository.existsUserByEmail(
			email
		);

		if (isEmailExists) {
			throw new IllegalArgumentError(
				UserErrorMessage.REGISTRATION_EMAIL_EXISTED
			);
		}
	};

	checkPasswordMatch = (password: string, confirmPassword: string) => {
		if (password !== confirmPassword) {
			throw new IllegalArgumentError(
				UserErrorMessage.REGISTRATION_MISMATCH_PASSWORD
			);
		}
	};
}
