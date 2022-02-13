import databaseConfig from '@src/config/database/postgres';
import { Connection, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormOptions: PostgresConnectionOptions = {
	type: 'postgres',
	host: databaseConfig.DB_HOST,
	port: databaseConfig.DB_PORT,
	username: databaseConfig.DB_USERNAME,
	password: databaseConfig.DB_PASSWORD,
	database: databaseConfig.DB_NAME,
	synchronize: true,
	logging: false,
	entities: ['src/entities/**/*.ts']
};

export const connectDatabase = async (): Promise<Connection> => {
	return new Promise((resolve, reject) => {
		createConnection(ormOptions)
			.then(conn => resolve(conn))
			.catch(err =>
				reject('Unable to connect to database: ' + err.message)
			);
	});
};
