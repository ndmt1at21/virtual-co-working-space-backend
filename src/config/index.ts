import dbConfig from './database';
import { appConfig } from './app';
import { authConfig } from './auth';
import { emailConfig } from './email';

const config = {
	app: appConfig,
	db: dbConfig,
	auth: authConfig,
	mail: emailConfig
};

export default config;
