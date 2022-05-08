export const AuthErrorMessages = {
	UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD:
		'Your email or password were incorrect',
	UNAUTHORIZED_INCORRECT_EXTERNAL: 'Your external login was incorrect',
	UNAUTHORIZED_USER_BLOCKED: 'User is blocked',
	UNAUTHORIZED_USER_NOT_FOUND: 'Your email or password were incorrect',
	UNAUTHORIZED_MISSING_TOKEN: 'Access token is required',
	UNAUTHORIZED_INVALID_TOKEN: 'Access token has expired or is not yet valid',
	UNAUTHORIZED_ALREADY_LOGGED_IN: 'You are already logged in',
	UNAUTHORIZED_PERMISSION_DENIED:
		'You do not have permission to access this resource',
	UNAUTHORIZED_EMAIL_NOT_VERIFIED: 'Email is not verified',

	LOGIN_MISSING_EMAIL_PASSWORD: 'Email and password are required',
	LOGIN_EXTERNAL_MISSING_EMAIL: 'Email is required',
	LOGIN_EXTERNAL_USER_NOT_FOUND: 'User not found',

	REGISTER_MISSING_EMAIL: 'Email is required for registration',
	REGISTER_MISSING_DISPLAY_NAME: 'Email is required for registration',
	REGISTER_MISSING_PASSWORD_OR_CONFIRM_PASSWORD:
		'Password and confirm password are required for registration',
	REGISTER_MISMATCH_CONFIRM_PASSWORD:
		'Password and confirm password must match',

	FORGOT_PASSWORD_MISSING_EMAIL: 'Email is required for forgot password',
	RESET_PASSWORD_MISSING_RESET_TOKEN:
		'Reset token is required for password reset',
	RESET_PASSWORD_MISSING_PASSWORD_OR_CONFIRM_PASSWORD:
		'Password and confirm password are required for password reset',
	RESET_PASSWORD_MISMATCH: 'Password and confirm password must match',
	RESET_PASSWORD_TOKEN_EXPIRED: 'Reset token has expired',
	RESET_PASSWORD_TOKEN_INVALID: 'Reset token is invalid',
	LOGOUT_MISSING_REFRESH_TOKEN: 'Refresh token is required for logout',
	REFRESH_ACCESS_TOKEN_MISSING_REFRESH_TOKEN:
		'Refresh token is required for renew access token',
	PASSWORD_MUST_BE_DIFFERENT_FROM_OLD:
		'Password must be different from old password',
	OLD_PASSWORD_IS_WRONG: 'Old password is incorrect'
};
