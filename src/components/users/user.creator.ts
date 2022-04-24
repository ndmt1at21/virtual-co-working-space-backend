import { UserDto } from './@types/dto/User.dto';
import { UserOverviewDto } from './@types/dto/UserOverviewDto';
import { IUserCreator } from './@types/IUserCreator';
import { mapUserToUserDto, mapUserToUserOverviewDto } from './user.mapping';
import { UserRepository } from './user.repository';

export const UserCreator = (userRepository: UserRepository): IUserCreator => {
	const createUserOverviewDtoById = async (
		id: number
	): Promise<UserOverviewDto> => {
		const user = await userRepository.findById(id);
		return mapUserToUserOverviewDto(user!);
	};

	const createUserOverviewByIds = async (
		ids: number[]
	): Promise<UserOverviewDto[]> => {
		const users = await userRepository.findByIds(ids);
		const usersDto = users.map(user => mapUserToUserOverviewDto(user));
		return usersDto;
	};

	const createUserDtoById = async (id: number): Promise<UserDto> => {
		const user = await userRepository.findById(id);
		return mapUserToUserDto(user!);
	};

	const createUserDtoByEmail = async (email: string): Promise<UserDto> => {
		const user = await userRepository.findUserByEmail(email);
		return mapUserToUserDto(user!);
	};

	return {
		createUserDtoById,
		createUserOverviewByIds,
		createUserOverviewDtoById,
		createUserDtoByEmail
	};
};
