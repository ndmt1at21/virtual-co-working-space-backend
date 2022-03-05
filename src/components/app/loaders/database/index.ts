import { ActiveUserToken } from '@src/components/activeUserToken/activeUserToken.entity';
import { OfficeItem } from '@src/components/officeItems/officeItem.entity';
import { OfficeMember } from '@src/components/officeMembers/officeMember.entity';
import { Office } from '@src/components/offices/office.entity';
import { PasswordResetToken } from '@src/components/passwordResetToken/passwordResetToken.entity';
import { RefreshToken } from '@src/components/refreshToken/refreshToken.entity';
import { User } from '@src/components/users/user.entity';
import config from '@src/config';
import { createConnection, createConnections } from 'typeorm';
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
	name: 'main',
	entities: [User, RefreshToken, ActiveUserToken, PasswordResetToken]
};

const ormMongoOptions: MongoConnectionOptions = {
	type: 'mongodb',
	host: config.db.mongo.DB_HOST,
	port: config.db.mongo.DB_PORT,
	username: config.db.mongo.DB_USERNAME,
	password: config.db.mongo.DB_PASSWORD,
	database: config.db.mongo.DB_NAME,
	logging: false,
	name: 'realtime',
	useNewUrlParser: true,
	useUnifiedTopology: true,
	synchronize: true,
	entities: [Office, OfficeItem, OfficeMember]
};

export const connectDatabase = async (): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		try {
			await createConnection(ormPostgresOptions);
			await createConnection(ormMongoOptions);
			resolve();
		} catch (err: any) {
			reject('Unable to connect to database: ' + err.message);
		}
	});
};