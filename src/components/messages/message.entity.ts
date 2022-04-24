import {
	Column,
	Entity,
	Index,
	ManyToOne,
	ObjectID,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { MessageStatus } from './@types/MessageStatus';
import { MessageType } from '@src/@types/MessageType';
import { MessageReader } from '../messageReaders/messageReader.entity';
import { User } from '../users/user.entity';
import { MessageReaction } from '../messageReactions/messageReaction.entity';

@Entity({ name: 'conversation' })
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: ObjectID;

	@Column({ name: 'conversation_id' })
	conversationId: number;

	@Column({ name: 'sender_id' })
	@Index()
	senderId: number;

	@Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
	type: MessageType;

	@Column({ name: 'content', length: 20000 })
	content: string;

	@Column({
		type: 'enum',
		enum: MessageStatus,
		default: MessageStatus.SENT
	})
	status: MessageStatus;

	@ManyToOne(type => User, user => user.id)
	sender: User;

	@OneToMany(type => MessageReaction, reaction => reaction.messageId)
	reactions: MessageReaction[];

	@OneToMany(type => MessageReader, reader => reader.messageId)
	readers: MessageReader[];
}
