import {
	Column,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { MessageType } from '@src/@types/MessageType';
import { User } from '../users/user.entity';
import { MessageReaction } from './components/messageReactions/messageReaction.entity';
import { MessageReader } from './components/messageReader/messageReader.entity';
import { MessageReceiver } from './components/messageReceiver/messageReceiver.entity';
import { UserMessageDeleted } from './components/userMessageDeleted/userMessageDeleted.entity';
import { MessageStatus } from './@types/MessageStatus';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'conversation_id' })
	conversationId: number;

	@Column({ name: 'sender_id' })
	@Index()
	senderId: number;

	@Column({ name: 'content', length: 20000 })
	content: string;

	@Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
	type: MessageType;

	@Column({ name: 'is_sent', default: false })
	isSent: boolean;

	@Column({ name: 'sent_at', nullable: true })
	sentAt: Date;

	@Column({ name: 'has_receiver', default: false })
	hasReceiver: boolean;

	@Column({ name: 'is_revoked', default: false })
	isRevoked: boolean;

	@Column({ name: 'revoked_at', nullable: true })
	revokedAt?: Date;

	@ManyToOne(type => User, user => user.id)
	sender: User;

	@OneToMany(type => MessageReaction, reaction => reaction.messageId)
	reactions: MessageReaction[];

	@OneToMany(type => MessageReader, messageReader => messageReader.messageId)
	readers: MessageReader[];

	@OneToMany(
		type => MessageReceiver,
		messageReceiver => messageReceiver.messageId
	)
	receivers: MessageReceiver[];

	@OneToMany(
		type => UserMessageDeleted,
		userMessageDeleted => userMessageDeleted.messageId
	)
	deletedMessageOfUsers: UserMessageDeleted[];

	public get status(): MessageStatus {
		if (this.isRevoked) return 'revoked';

		if (this.hasReceiver) return 'read';

		if (this.isSent) return 'sent';

		return 'failed';
	}
}
