import dbConfig from './database';
import { appConfig } from './app';
import { authConfig } from './auth';
import { emailConfig } from './email';
import { cloudConfig } from './cloud';
import { officeConfig } from './office';
import { notificationConfig } from './notification';

const config = {
	app: appConfig,
	db: dbConfig,
	auth: authConfig,
	mail: emailConfig,
	cloud: cloudConfig,
	office: officeConfig,
	notification: notificationConfig
};

export default config;
