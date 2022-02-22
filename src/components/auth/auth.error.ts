export const AuthErrorMessages = {
	UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD:
		'Your email or password were incorrect',
	UNAUTHORIZED_INCORRECT_EXTERNAL: 'Your external login was incorrect',
	UNAUTHORIZED_USER_BLOCKED: 'User is blocked',
	UNAUTHORIZED_MISSING_TOKEN: 'Access token and refresh token are required',
	UNAUTHORIZED_INVALID_TOKEN: 'Access token is invalid',
	UNAUTHORIZED_ALREADY_LOGGED_IN: 'You are already logged in',
	LOGIN_MISSING_EMAIL_PASSWORD: 'Email and password are required',
	LOGIN_EXTERNAL_MISSING_EMAIL: 'Email is required',
	LOGIN_EXTERNAL_USER_NOT_FOUND: 'User not found',
	REGISTER_MISSING_EMAIL: 'Email is required for registration',
	REGISTER_MISSING_DISPLAY_NAME: 'Email is required for registration',
	REGISTER_MISSING_PASSWORD_OR_CONFIRM_PASSWORD:
		'Password and confirm password are required for registration',
	REGISTER_MISMATCH_CONFIRM_PASSWORD:
		'Password and confirm password must match'
};
