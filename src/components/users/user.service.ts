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
import { IPasswordEncoder } from './components/passwordEncoder/@types/IPasswordEncoder';
import { FindAllUsersOptions } from './@types/filter/FindAllUsersOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { NotFoundError } from '@src/utils/appError';
import { UserErrorMessage } from './user.error';

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

	const findAllUsers = async (
		options: FindAllUsersOptions
	): Promise<[UserDto[], PaginationInfo]> => {
		const [users, pageInfo] = await userRepository.findAllUsers(options);
		const usersDto = users.map(user =>
			userCreator.userEntityToUserDto(user)
		);

		return [usersDto, pageInfo];
	};

	const updateUserById = async (
		id: number,
		payload: UpdateUserDto
	): Promise<UserDto> => {
		await userValidate.checkUserExistsById(id);

		const user = await userRepository.findById(id);

		const updatedUser = await userRepository.save({
			...user!,
			...payload
		});

		return userCreator.userEntityToUserDto(updatedUser);
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

	const updateUserBlockStatus = async (
		id: number,
		status: UserStatus
	): Promise<number> => {
		const result = await userRepository.update(id, {
			status
		});

		if (result.affected === 0)
			throw new NotFoundError(UserErrorMessage.USER_NOT_FOUND);

		return id;
	};

	const activeNewUser = async (id: number): Promise<UserDto> => {
		const updatedUser = await userRepository.save({
			id,
			status: UserStatus.ACTIVE
		});

		return updatedUser;
	};

	return {
		createLocalUser,
		findOrCreateUserByExternal,
		findUserById,
		findUserByEmail,
		findAllUsers,
		updateUserById,
		updatePasswordById,
		deleteUserById,
		updateUserBlockStatus,
		activeNewUser
	};
};
