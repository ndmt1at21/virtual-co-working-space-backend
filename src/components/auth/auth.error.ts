export const AuthErrorMessages = {
	UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD:
		'email_or_password_were_incorrect',
	UNAUTHORIZED_INCORRECT_EXTERNAL: 'external_login_was_incorrect',
	UNAUTHORIZED_USER_BLOCKED: 'user_is_blocked',
	UNAUTHORIZED_USER_NOT_FOUND: 'email_or_password_were_incorrect',
	UNAUTHORIZED_MISSING_TOKEN: 'access_token_is_required',
	UNAUTHORIZED_INVALID_TOKEN: 'access_token_has_expired_or_is_not_yet_valid',
	UNAUTHORIZED_ALREADY_LOGGED_IN: 'you_are_already_logged_in',
	UNAUTHORIZED_PERMISSION_DENIED:
		'do_not_have_permission_to_access_this_resource',
	UNAUTHORIZED_EMAIL_NOT_VERIFIED: 'email_is_not_verified',

	LOGIN_MISSING_EMAIL_PASSWORD: 'email_and_password_are_required',
	LOGIN_EXTERNAL_MISSING_EMAIL: 'email_is_required',
	LOGIN_EXTERNAL_USER_NOT_FOUND: 'user_not_found',
	LOGIN_EXTERNAL_USER_EXISTS_IN_LOCAL: 'user_already_exists',

	REGISTER_MISSING_EMAIL: 'email_is_required_for_registration',
	REGISTER_MISSING_DISPLAY_NAME: 'email_is_required_for_registration',
	REGISTER_MISSING_PASSWORD_OR_CONFIRM_PASSWORD:
		'password_and_confirm_password_are_required_for_registration',
	REGISTER_MISMATCH_CONFIRM_PASSWORD:
		'password_and_confirm_password_must_match',

	FORGOT_PASSWORD_MISSING_EMAIL: 'email_is_required_for_forgot_password',
	RESET_PASSWORD_MISSING_RESET_TOKEN:
		'reset_token_is_required_for_password_reset',
	RESET_PASSWORD_MISSING_PASSWORD_OR_CONFIRM_PASSWORD:
		'password_and_confirm_password_are_required_for_password_reset',
	RESET_PASSWORD_MISMATCH: 'password_and_confirm_password_must_match',
	RESET_PASSWORD_TOKEN_EXPIRED: 'reset_token_has_expired',
	RESET_PASSWORD_TOKEN_INVALID: 'reset_token_is_invalid',
	LOGOUT_MISSING_REFRESH_TOKEN: 'refresh_token_is_required_for_logout',
	REFRESH_ACCESS_TOKEN_MISSING_REFRESH_TOKEN:
		'refresh_token_is_required_for_renew_access_token',
	PASSWORD_MUST_BE_DIFFERENT_FROM_OLD:
		'password_must_be_different_from_old_password',
	OLD_PASSWORD_IS_WRONG: 'old_password_is_incorrect',
	PASSWORD_IS_CHANGED_AFTER_IAT_ACCESS_TOKEN: 'password_is_changed'
};
