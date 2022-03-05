export type PasswordResetTokenDto = {
	id: string;
	userId: string;
	passwordResetToken: string;
	passwordResetTokenExpired: Date;
	createdAt: Date;
};
