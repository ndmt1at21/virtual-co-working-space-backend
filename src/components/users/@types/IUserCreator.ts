import { User } from '../user.entity';
import { UserDto } from './dto/User.dto';
import { UserOverviewDto } from './dto/UserOverviewDto';

export interface IUserCreator {
	createUserDtoById(id: number): Promise<UserDto>;

	createUserOverviewByIds(ids: number[]): Promise<UserOverviewDto[]>;

	createUserDtoByEmail(email: string): Promise<UserDto>;

	createUserOverviewDtoById(id: number): Promise<UserOverviewDto>;
}
