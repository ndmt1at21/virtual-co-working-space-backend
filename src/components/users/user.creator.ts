import { UserDto } from './@types/dto/User.dto';
import { User } from './user.entity';

export const UserCreator = () => {
	const userEntityToUserDto = (model: User): UserDto => {
		return {
			id: model.id,
			name: model.name,
			email: model.email,
			avatar: model.avatar,
			phone: model.phone,
			status: model.status,
			provider: model.provider,
			externalId: model.externalId,
			createdAt: model.createdAt
		};
	};

	return { userEntityToUserDto };
};
