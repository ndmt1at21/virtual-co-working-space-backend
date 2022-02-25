import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const databaseConfig = {
	DB_HOST: process.env.DB_MONGO_HOST,
	DB_USERNAME: process.env.DB_MONGO_USERNAME,
	DB_PASSWORD: process.env.DB_MONGO_PASSWORD,
	DB_NAME: process.env.DB_MONGO_NAME,
	DB_PORT: process.env.DB_MONGO_PORT ? +process.env.DB_MONGO_PORT : 5432
};

export default databaseConfig;
