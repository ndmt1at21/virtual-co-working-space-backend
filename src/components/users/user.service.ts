import config from '@src/config';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './@types/dto/CreateUser.dto';
import { UpdateUserDto } from './@types/dto/UpdateUser.dto';
import { UserDto } from './@types/dto/User.dto';
import { IUserCreator } from './@types/IUserCreator';
import { IUserService } from './@types/IUserService';
import { IUserValidate } from './@types/IUserValidate';
import { UserRepository } from './user.repository';
import { CreateUserExternalDto } from './@types/dto/CreateUserExternal.dto';
import { UserStatus } from './@types/UserStatus';
import { UpdatePasswordDto } from './@types/dto/UpdatePassword.dto';
import { IPasswordEncoder } from '../passwordEncoder/@types/IPasswordEncoder';

export const UserService = (
	userRepository: UserRepository,
	userValidate: IUserValidate,
	userCreator: IUserCreator,
	passwordEncoder: IPasswordEncoder
): IUserService => {
	const createLocalUser = async (
		payload: CreateUserDto
	): Promise<UserDto> => {
		await userValidate.checkCreateUserData(payload);

		const encryptedPassword = hashSync(
			payload.password,
			config.auth.BCRYPT_SALT_ROUNDS
		);

		const userCreated = await userRepository.save({
			...payload,
			password: encryptedPassword
		});

		return userCreator.userEntityToUserDto(userCreated);
	};

	const findOrCreateUserByExternal = async (
		payload: CreateUserExternalDto
	) => {
		const user = await userRepository.findUserByExternalId(
			payload.externalId,
			payload.provider
		);

		if (user) return userCreator.userEntityToUserDto(user);

		const userCreated = await userRepository.save({
			...payload
		});

		return userCreator.userEntityToUserDto(userCreated);
	};

	const findUserById = async (id: number): Promise<UserDto> => {
		await userValidate.checkUserExistsById(id);
		const user = await userRepository.findById(id);
		return userCreator.userEntityToUserDto(user!);
	};

	const findUserByEmail = async (email: string): Promise<UserDto> => {
		await userValidate.checkUserExistsByEmail(email);
		const user = await userRepository.findUserByEmail(email);
		return userCreator.userEntityToUserDto(user!);
	};

	const updateUserById = async (
		id: number,
		payload: UpdateUserDto
	): Promise<UserDto> => {
		await userValidate.checkUserExistsById(id);

		const user = await userRepository.findById(id);

		return await userRepository.save({
			...user!,
			...payload
		});
	};

	const updatePasswordById = async (
		id: number,
		updatePasswordDto: UpdatePasswordDto
	): Promise<UserDto> => {
		await userValidate.checkUpdatePasswordData(id, updatePasswordDto);

		const user = await userRepository.findById(id);
		const hashPassword = passwordEncoder.encode(updatePasswordDto.password);

		const updatedUser = await userRepository.save({
			...user!,
			password: hashPassword
		});

		return userCreator.userEntityToUserDto(updatedUser);
	};

	const deleteUserById = async (id: number): Promise<void> => {
		await userValidate.checkUserExistsById(id);
		await userRepository.softDelete(id);
	};

	const blockUserById = async (id: number): Promise<UserDto> => {
		await userValidate.checkUserExistsById(id);

		const user = await userRepository.findById(id);

		return await userRepository.save({
			...user!,
			status: UserStatus.BLOCKED
		});
	};

	return {
		createLocalUser,
		findOrCreateUserByExternal,
		findUserById,
		findUserByEmail,
		updateUserById,
		updatePasswordById,
		deleteUserById,
		blockUserById
	};
};
