import { CreateUserDto } from './dto/CreateUser.dto';

export interface IUserValidate {
	checkCreateUserData: (data: CreateUserDto) => Promise<void>;

	checkUserExistsById: (id: number) => Promise<void>;

	checkUserExistsByEmail: (email: string) => Promise<void>;
}
