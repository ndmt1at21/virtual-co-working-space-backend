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
import { mapUserToUserDto } from './user.mapping';
import { UserRoleType } from './@types/UserRoleType';

export class UserService implements IUserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userValidate: IUserValidate,
		private readonly userCreator: IUserCreator,
		private readonly passwordEncoder: IPasswordEncoder
	) {}

	createLocalUserWithRole = async (
		payload: CreateUserDto,
		role: UserRoleType
	): Promise<UserDto> => {
		const encryptedPassword = this.passwordEncoder.encode(payload.password);

		const userCreated = await this.userRepository.save({
			...payload,
			password: encryptedPassword,
			type: role
		});

		return mapUserToUserDto(userCreated);
	};

	createLocalUser = async (payload: CreateUserDto): Promise<UserDto> => {
		await this.userValidate.checkCreateUserData(payload);

		const encryptedPassword = hashSync(
			payload.password,
			config.auth.BCRYPT_SALT_ROUNDS
		);

		const userCreated = await this.userRepository.save({
			...payload,
			password: encryptedPassword
		});

		return mapUserToUserDto(userCreated);
	};

	findOrCreateUserByExternal = async (payload: CreateUserExternalDto) => {
		const user = await this.userRepository.findUserByExternalId(
			payload.externalId,
			payload.provider
		);

		if (user) return mapUserToUserDto(user);

		const userCreated = await this.userRepository.save({
			...payload,
			status: UserStatus.ACTIVE
		});

		return mapUserToUserDto(userCreated);
	};

	findUserById = async (id: number): Promise<UserDto> => {
		await this.userValidate.checkUserExistsById(id);
		return await this.userCreator.createUserDtoById(id);
	};

	findUserByEmail = async (email: string): Promise<UserDto> => {
		await this.userValidate.checkUserExistsByEmail(email);
		return await this.userCreator.createUserDtoByEmail(email);
	};

	findAllUsers = async (
		options: FindAllUsersOptions
	): Promise<[UserDto[], PaginationInfo]> => {
		const [users, pageInfo] = await this.userRepository.findAllUsers(
			options
		);
		const usersDto = users.map(user => mapUserToUserDto(user));

		return [usersDto, pageInfo];
	};

	updateUserById = async (
		id: number,
		payload: UpdateUserDto
	): Promise<UserDto> => {
		await this.userValidate.checkUserExistsById(id);

		const user = await this.userRepository.findById(id);
		const updatedUser = await this.userRepository.save({
			...user!,
			...payload
		});

		return mapUserToUserDto(updatedUser);
	};

	updatePasswordById = async (
		id: number,
		updatePasswordDto: UpdatePasswordDto
	): Promise<UserDto> => {
		await this.userValidate.checkUpdatePasswordData(id, updatePasswordDto);

		const user = await this.userRepository.findById(id);
		const hashPassword = this.passwordEncoder.encode(
			updatePasswordDto.password
		);

		const updatedUser = await this.userRepository.save({
			...user!,
			password: hashPassword,
			passwordUpdateAt: new Date()
		});

		return mapUserToUserDto(updatedUser);
	};

	deleteUserById = async (id: number): Promise<void> => {
		await this.userValidate.checkUserExistsById(id);
		await this.userRepository.softDelete(id);
	};

	updateUserBlockStatus = async (
		id: number,
		status: UserStatus
	): Promise<number> => {
		const result = await this.userRepository.update(id, {
			status
		});

		if (result.affected === 0)
			throw new NotFoundError(UserErrorMessage.USER_NOT_FOUND);

		return id;
	};

	activeNewUser = async (id: number): Promise<UserDto> => {
		const updatedUser = await this.userRepository.save({
			id,
			status: UserStatus.ACTIVE
		});

		return updatedUser;
	};
}
