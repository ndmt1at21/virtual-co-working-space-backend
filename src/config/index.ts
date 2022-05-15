import dbConfig from './database';
import { appConfig } from './app';
import { authConfig } from './auth';
import { emailConfig } from './email';
import { cloudConfig } from './cloud';
import { officeConfig } from './office';

const config = {
	app: appConfig,
	db: dbConfig,
	auth: authConfig,
	mail: emailConfig,
	cloud: cloudConfig,
	office: officeConfig
};

export default config;
