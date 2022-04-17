import { CreateUserDto } from './dto/CreateUser.dto';
import { CreateUserExternalDto } from './dto/CreateUserExternal.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserDto } from './dto/User.dto';
import { FindAllUsersOptions } from './filter/FindAllUsersOptions';

export interface IUserService {
	createLocalUser: (payload: CreateUserDto) => Promise<UserDto>;

	findOrCreateUserByExternal: (
		payload: CreateUserExternalDto
	) => Promise<UserDto>;

	findUserById: (id: number) => Promise<UserDto>;

	findUserByEmail: (email: string) => Promise<UserDto>;

	findAllUsers: (options: FindAllUsersOptions) => Promise<UserDto[]>;

	updateUserById: (id: number, payload: UpdateUserDto) => Promise<UserDto>;

	updatePasswordById: (
		id: number,
		updatePasswordDto: UpdatePasswordDto
	) => Promise<UserDto>;

	deleteUserById: (id: number) => Promise<void>;

	blockUserById: (id: number) => Promise<number>;

	activeNewUser: (id: number) => Promise<UserDto>;
}
