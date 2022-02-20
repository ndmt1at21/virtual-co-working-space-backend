import passport from 'passport';
import config from '@src/config';
import { Strategy as PassportGoogleStrategy } from 'passport-google-oauth2';
import { Strategy as PassportFacebookStrategy } from 'passport-facebook';
import { IUserService } from '@components/users/@types/IUserService';
import { UserLoginProvider } from '@components/users/@types/UserLoginProvider';

const GoogleStrategy = (userService: IUserService) => {
	const strategy = new PassportGoogleStrategy(
		{
			callbackURL: '/api/v1/auth/google/callback',
			clientID: config.auth.GOOGLE_CLIENT_ID,
			clientSecret: config.auth.GOOGLE_CLIENT_SECRET
		},
		(accessToken, refreshToken, profile: any, done) => {
			userService
				.findOrCreateUserByExternal({
					email: profile.emails[0],
					avatar: profile.picture,
					externalId: profile.id,
					provider: UserLoginProvider.GOOGLE,
					name: profile.displayName
				})
				.then(user => {
					done(null, user);
				})
				.catch(err => {
					done(err, null);
				});
		}
	);

	passport.use('google', strategy);
};

const FacebookStrategy = (userService: IUserService) => {
	const strategy = new PassportFacebookStrategy(
		{
			callbackURL: '/api/v1/auth/facebook/callback',
			clientID: config.auth.FACEBOOK_CLIENT_ID,
			clientSecret: config.auth.FACEBOOK_CLIENT_SECRET,
			profileFields: ['id', 'email', 'displayName', 'name', 'photos']
		},
		async function verify(accessToken, refreshToken, profile: any, done) {
			const user = await userService.findOrCreateUserByExternal({
				email: profile.emails[0].value,
				avatar: profile.photos[0].value,
				externalId: profile.id,
				provider: UserLoginProvider.FACEBOOK,
				name: profile.displayName
			});

			return done(null, user);
		}
	);

	passport.use('facebook', strategy);
};

export const loadStrategies = (userService: IUserService) => {
	GoogleStrategy(userService);
	FacebookStrategy(userService);
};
