import { User } from '../user.entity';
import { UserDto } from './dto/User.dto';

export interface IUserCreator {
	userEntityToUserDto: (model: User) => UserDto;
}
