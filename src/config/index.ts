import { appConfig } from './app';
import { mongoConfig, postgresConfig } from './database';
import { authConfig } from './auth';

const config = {
	app: appConfig,
	db: {
		mongo: mongoConfig,
		postgres: postgresConfig
	},
	auth: authConfig
};

export default config;
