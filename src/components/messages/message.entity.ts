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
import { MessageStatus } from './@types/MessageStatus';
import { UserMessageStatus } from './components/userMessageStatus/userMessageStatus.entity';
import { UserMessageStatusType } from './@types/UserMessageStatusType';

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

	@Column({ name: 'is_sent', default: true })
	isSent: boolean;

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

	@OneToMany(
		type => UserMessageStatus,
		userMessageStatus => userMessageStatus.messageId
	)
	userMessageStatuses: UserMessageStatus[];

	public get status(): MessageStatus {
		if (this.isRevoked) return 'revoked';

		if (this.hasReceiver) return 'read';

		if (this.isSent) return 'sent';

		return 'failed';
	}

	public get readers(): UserMessageStatus[] {
		return this.userMessageStatuses.filter(
			userMessageStatus =>
				userMessageStatus.status === UserMessageStatusType.READ
		);
	}

	public get receivers(): UserMessageStatus[] {
		return this.userMessageStatuses.filter(
			userMessageStatus =>
				userMessageStatus.status === UserMessageStatusType.RECEIVED
		);
	}
}
