import { UserDto } from './@types/dto/User.dto';
import { UserOverviewDto } from './@types/dto/UserOverviewDto';
import { User } from './user.entity';

export const mapUserToUserDto = (user: User): UserDto => {
	const { password, ...userDto } = user;
	return userDto;
};

export const mapUserToUserOverviewDto = (user: User): UserOverviewDto => {
	const { id, name, avatar } = user;
	return { id, name, avatar };
};
