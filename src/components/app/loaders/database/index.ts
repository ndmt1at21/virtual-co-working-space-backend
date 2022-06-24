import { ActiveUserToken } from '@src/components/activeUserToken';
import { Appearance } from '@src/components/appearances/appearance.entity';
import { PasswordResetToken } from '@src/components/auth/components/passwordResetToken/passwordResetToken.entity';
import { RefreshToken } from '@src/components/auth/components/refreshToken/refreshToken.entity';
import { CheckIn } from '@src/components/checkin/checkin.entity';
import { ConversationMember } from '@src/components/conversationMembers/conversationMember.entity';
import { Conversation } from '@src/components/conversations/conversation.entity';
import { ItemCategory } from '@src/components/itemCategories/itemCategory.entity';
import { Item } from '@src/components/items/item.entity';
import { MessageReaction } from '@src/components/messages/components/messageReactions/messageReaction.entity';
import { UserMessageStatus } from '@src/components/messages/components/userMessageStatus/userMessageStatus.entity';
import { Message } from '@src/components/messages/message.entity';
import { EntityType } from '@src/components/notifications/components/entityType/entityType.entity';
import { NotificationObject } from '@src/components/notifications/components/notificationObject/notificationObject.entity';
import { OfficeInvitation } from '@src/components/officeInvitation/officeInvitation.entity';
import { OfficeItem } from '@src/components/officeItems/officeItem.entity';
import { OfficeMemberRole } from '@src/components/officeMemberRole/officeMemberRole.entity';
import { OfficeMember } from '@src/components/officeMembers/officeMember.entity';
import { OfficeMemberTransform } from '@src/components/officeMemberTransform/officeMemberTransform.entity';
import { Notification } from '@src/components/notifications/notification.entity';
import { OfficeRole } from '@src/components/officeRoles/officeRole.entity';
import { Office } from '@src/components/offices/office.entity';
import { PushToken } from '@src/components/pushTokens/pushToken.entity';
import { User } from '@src/components/users/user.entity';
import { createConnection, createConnections } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CacheConnectOption, createCacheConnection } from './cache';
import config from '@src/config';

export const ormPostgresOptions: PostgresConnectionOptions = {
	type: 'postgres',
	host: config.db.pg.DB_HOST,
	port: config.db.pg.DB_PORT,
	username: config.db.pg.DB_USERNAME,
	password: config.db.pg.DB_PASSWORD,
	database: config.db.pg.DB_NAME,
	logging: false,
	dropSchema: false,
	migrationsRun: true,
	synchronize: false,
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
		MessageReaction,
		UserMessageStatus,
		Appearance,
		ItemCategory,
		CheckIn,
		PushToken,
		Notification,
		NotificationObject,
		EntityType
	]
};

export const officeMemberTransformCache: CacheConnectOption = {
	connName: 'officeMemberTransform',
	options: {
		socket: {
			port: 6379,
			host: 'localhost'
		}
	}
};

export const mailCache: CacheConnectOption = {
	connName: 'mail',
	options: {
		socket: {
			port: 6380,
			host: 'localhost'
		}
	}
};

export const officeMemberCache: CacheConnectOption = {
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
