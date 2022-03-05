import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';

export interface IUserValidate {
	checkCreateUserData: (data: CreateUserDto) => Promise<void>;

	checkUpdatePasswordData: (
		userId: string,
		data: UpdatePasswordDto
	) => Promise<void>;

	checkUserExistsById: (id: string) => Promise<void>;

	checkUserExistsByEmail: (email: string) => Promise<void>;
}
