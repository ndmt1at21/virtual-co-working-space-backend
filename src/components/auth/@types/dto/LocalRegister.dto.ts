import { UserDto } from '@src/components/users/@types/dto/User.dto';

export type LocalRegisterDto = {
	user: UserDto;
	activeToken: string;
};
