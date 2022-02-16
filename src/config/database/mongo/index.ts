import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const databaseConfig = {
	DB_HOST: process.env.DB_HOST,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,
	DB_PORT: process.env.DB_PORT ? +process.env.DB_PORT : 5432
};

export default databaseConfig;
