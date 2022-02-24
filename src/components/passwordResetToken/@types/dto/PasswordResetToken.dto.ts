export type PasswordResetTokenDto = {
	id: number;
	userId: number;
	passwordResetToken: string;
	passwordResetTokenExpired: Date;
	createdAt: Date;
};
