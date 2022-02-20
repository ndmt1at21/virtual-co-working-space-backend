import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const databaseConfig = {
	DB_POSTGRES_HOST: process.env.DB_POSTGRES_HOST,
	DB_POSTGRES_USERNAME: process.env.DB_POSTGRES_USERNAME,
	DB_POSTGRES_PASSWORD: process.env.DB_POSTGRES_PASSWORD,
	DB_POSTGRES_NAME: process.env.DB_POSTGRES_NAME,
	DB_POSTGRES_PORT: process.env.DB_POSTGRES_PORT
		? +process.env.DB_POSTGRES_PORT
		: 5432
};

export default databaseConfig;
