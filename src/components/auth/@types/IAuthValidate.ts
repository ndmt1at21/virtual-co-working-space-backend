export type IAuthValidate = {
	validateUserById: (id: number) => Promise<boolean>;

	validateLocalUser: (email: string, password: string) => Promise<boolean>;
};
