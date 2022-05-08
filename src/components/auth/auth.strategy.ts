import passport from 'passport';
import config from '@src/config';
import { Strategy as PassportGoogleStrategy } from 'passport-google-oauth2';
import { Strategy as PassportFacebookStrategy } from 'passport-facebook';
import { OAuth2ProfileDto } from './@types/dto/OAuth2Profile.dto';
import { AuthErrorMessages } from './auth.error';
import { UserLoginProvider } from './@types/UserLoginProvider';

const GoogleStrategy = () => {
	const strategy = new PassportGoogleStrategy(
		{
			callbackURL: '/api/v1/auth/google/callback',
			clientID: config.auth.GOOGLE_CLIENT_ID,
			clientSecret: config.auth.GOOGLE_CLIENT_SECRET
		},
		(accessToken, refreshToken, profile: any, done) => {
			console.log(profile);
			if (profile.emails.length === 0)
				return done(
					AuthErrorMessages.LOGIN_EXTERNAL_USER_NOT_FOUND,
					null
				);

			const convertedProfile: OAuth2ProfileDto = {
				email: profile.emails[0].value,
				avatar: profile.picture,
				profileId: profile.id,
				phone: profile.phone,
				name: profile.displayName,
				provider: UserLoginProvider.GOOGLE
			};

			return done(null, convertedProfile);
		}
	);

	passport.use('google', strategy);
};

const FacebookStrategy = () => {
	const strategy = new PassportFacebookStrategy(
		{
			callbackURL: '/api/v1/auth/facebook/callback',
			clientID: config.auth.FACEBOOK_CLIENT_ID,
			clientSecret: config.auth.FACEBOOK_CLIENT_SECRET,
			profileFields: ['id', 'email', 'displayName', 'name', 'photos']
		},
		(accessToken, refreshToken, profile: any, done) => {
			if (profile.emails.length === 0)
				return done(
					AuthErrorMessages.LOGIN_EXTERNAL_USER_NOT_FOUND,
					null
				);

			const convertedProfile: OAuth2ProfileDto = {
				email: profile.emails[0].value,
				avatar: profile.photos[0].value,
				profileId: profile.id,
				phone: profile.phone,
				name: profile.displayName,
				provider: UserLoginProvider.FACEBOOK
			};

			return done(null, convertedProfile);
		}
	);

	passport.use('facebook', strategy);
};

export const loadStrategies = () => {
	GoogleStrategy();
	FacebookStrategy();
};
