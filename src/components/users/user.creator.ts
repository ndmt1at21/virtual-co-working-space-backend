import { UserDto } from './@types/dto/User.dto';
import { UserOverviewDto } from './@types/dto/UserOverviewDto';
import { IUserCreator } from './@types/IUserCreator';
import { mapUserToUserDto, mapUserToUserOverviewDto } from './user.mapping';
import { UserRepository } from './user.repository';

export class UserCreator implements IUserCreator {
	constructor(private readonly userRepository: UserRepository) {}

	createUserOverviewDtoById = async (
		id: number
	): Promise<UserOverviewDto> => {
		const user = await this.userRepository.findById(id);
		return mapUserToUserOverviewDto(user!);
	};

	createUserOverviewByIds = async (
		ids: number[]
	): Promise<UserOverviewDto[]> => {
		const users = await this.userRepository.findByIds(ids);
		const usersDto = users.map(user => mapUserToUserOverviewDto(user));
		return usersDto;
	};

	createUserDtoById = async (id: number): Promise<UserDto> => {
		const user = await this.userRepository.findById(id);
		return mapUserToUserDto(user!);
	};

	createUserDtoByEmail = async (email: string): Promise<UserDto> => {
		const user = await this.userRepository.findUserByEmail(email);
		return mapUserToUserDto(user!);
	};
}
