export type CreateUserDto = {
	name: string;
	email: string;
	phone?: string;
	password: string;
	passwordConfirm: string;
};
