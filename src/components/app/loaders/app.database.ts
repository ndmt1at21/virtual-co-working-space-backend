import databaseConfig from '@src/config/database/postgres';
import { Connection, createConnection } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormPostgresOptions: PostgresConnectionOptions = {
	type: 'postgres',
	host: databaseConfig.DB_POSTGRES_HOST,
	port: databaseConfig.DB_POSTGRES_PORT,
	username: databaseConfig.DB_POSTGRES_USERNAME,
	password: databaseConfig.DB_POSTGRES_PASSWORD,
	database: databaseConfig.DB_POSTGRES_NAME,
	synchronize: true,
	logging: false,
	entities: ['src/components/**/*.entity.ts']
};

const ormMongoOptions: MongoConnectionOptions = {
	type: 'mongodb',
	host: databaseConfig.DB_POSTGRES_HOST
};

export const connectDatabase = async (): Promise<Connection> => {
	return new Promise((resolve, reject) => {
		createConnection(ormPostgresOptions)
			.then(conn => resolve(conn))
			.catch(err =>
				reject('Unable to connect to database: ' + err.message)
			);
	});
};
