import config from '@src/config';
import { createConnections } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormPostgresOptions: PostgresConnectionOptions = {
	type: 'postgres',
	host: config.db.pg.DB_HOST,
	port: config.db.pg.DB_PORT,
	username: config.db.pg.DB_USERNAME,
	password: config.db.pg.DB_PASSWORD,
	database: config.db.pg.DB_NAME,
	synchronize: true,
	logging: false,
	entities: ['src/components/**/*.entity.ts']
};

const ormMongoOptions: MongoConnectionOptions = {
	type: 'mongodb',
	host: config.db.mongo.DB_HOST,
	port: config.db.mongo.DB_PORT,
	username: config.db.mongo.DB_USERNAME,
	password: config.db.mongo.DB_PASSWORD,
	database: config.db.mongo.DB_NAME,
	synchronize: true,
	logging: false,
	useUnifiedTopology: true
};

export const connectDatabase = async (): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		try {
			await createConnections([ormPostgresOptions]);
			resolve();
		} catch (err: any) {
			reject('Unable to connect to database: ' + err.message);
		}
	});
};
