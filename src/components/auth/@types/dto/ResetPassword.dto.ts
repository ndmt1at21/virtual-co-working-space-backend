export type ResetPasswordDto = {
	resetToken: string;
	password: string;
	confirmPassword: string;
};
