import { CreateUserDto } from './dto/CreateUser.dto';
import { CreateUserExternalDto } from './dto/CreateUserExternal.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserDto } from './dto/User.dto';

export interface IUserService {
	createLocalUser: (payload: CreateUserDto) => Promise<UserDto>;

	findOrCreateUserByExternal: (
		payload: CreateUserExternalDto
	) => Promise<UserDto>;

	findUserById: (id: string) => Promise<UserDto>;

	findUserByEmail: (email: string) => Promise<UserDto>;

	updateUserById: (id: string, payload: UpdateUserDto) => Promise<UserDto>;

	updatePasswordById: (
		id: string,
		updatePasswordDto: UpdatePasswordDto
	) => Promise<UserDto>;

	deleteUserById: (id: string) => Promise<void>;

	blockUserById: (id: string) => Promise<number>;

	activeNewUser: (id: string) => Promise<UserDto>;
}
