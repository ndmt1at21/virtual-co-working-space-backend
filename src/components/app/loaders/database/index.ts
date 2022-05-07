import config from '@src/config';
import { ActiveUserToken } from '@src/components/activeUserToken/activeUserToken.entity';
import { Item } from '@src/components/items/item.entity';
import { OfficeItem } from '@src/components/officeItems/officeItem.entity';
import { OfficeMember } from '@src/components/officeMembers/officeMember.entity';
import { OfficeMemberTransform } from '@src/components/officeMemberTransform/officeMemberTransform.entity';
import { OfficeRole } from '@src/components/officeRoles/officeRole.entity';
import { Office } from '@src/components/offices/office.entity';
import { User } from '@src/components/users/user.entity';
import { createConnection } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CacheConnectOption, createCacheConnection } from './cache';
import { OfficeMemberRole } from '@src/components/officeMemberRole/officeMemberRole.entity';
import { OfficeInvitation } from '@src/components/officeInvitation/officeInvitation.entity';
import { Conversation } from '@src/components/conversations/conversation.entity';
import { ConversationMember } from '@src/components/conversationMembers/conversationMember.entity';
import { Message } from '@src/components/messages/message.entity';
import { MessageStatus } from '@src/components/messageStatus/messageStatus.entity';
import { RefreshToken } from '@src/components/auth/components/refreshToken/refreshToken.entity';
import { PasswordResetToken } from '@src/components/auth/components/passwordResetToken/passwordResetToken.entity';
import { AccessoryCategory } from '@src/components/accessoryCategories/accessoryCategory.entity';
import { Accessory } from '@src/components/accessories/accessory.entity';

const ormPostgresOptions: PostgresConnectionOptions = {
	type: 'postgres',
	host: config.db.pg.DB_HOST,
	port: config.db.pg.DB_PORT,
	username: config.db.pg.DB_USERNAME,
	password: config.db.pg.DB_PASSWORD,
	database: config.db.pg.DB_NAME,
	dropSchema: false,
	synchronize: true,
	entities: [
		User,
		RefreshToken,
		ActiveUserToken,
		PasswordResetToken,
		Item,
		Office,
		OfficeItem,
		OfficeMember,
		OfficeRole,
		OfficeMemberTransform,
		OfficeMemberRole,
		OfficeInvitation,
		Conversation,
		ConversationMember,
		Message,
		MessageStatus,
		AccessoryCategory,
		Accessory
	]
};

const ormMongoOptions: MongoConnectionOptions = {
	type: 'mongodb',
	host: config.db.mongo.DB_HOST,
	port: config.db.mongo.DB_PORT,
	username: config.db.mongo.DB_USERNAME,
	password: config.db.mongo.DB_PASSWORD,
	database: config.db.mongo.DB_NAME,
	logging: false,
	dropSchema: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	synchronize: true,
	entities: []
};

const officeMemberTransformCache: CacheConnectOption = {
	connName: 'officeMemberTransform',
	options: {
		socket: {
			port: 6379,
			host: 'localhost'
		}
	}
};

const mailCache: CacheConnectOption = {
	connName: 'mail',
	options: {
		socket: {
			port: 6380,
			host: 'localhost'
		}
	}
};

const officeMemberCache: CacheConnectOption = {
	connName: 'officeMember',
	options: {
		socket: {
			port: 6381,
			host: 'localhost'
		}
	}
};

export const connectDatabase = async (): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		try {
			await createConnection(ormPostgresOptions);
			await createCacheConnection([
				officeMemberTransformCache,
				mailCache,
				officeMemberCache
			]);
			resolve();
		} catch (err: any) {
			reject('Unable to connect to database: ' + err.message);
		}
	});
};

export * from './initDatabase';
