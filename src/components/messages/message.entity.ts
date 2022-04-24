import {
	Column,
	Entity,
	Index,
	ObjectID,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { MessageReader } from './@types/MessageReader';
import { MessageStatus } from './@types/MessageStatus';
import { MessageType } from '@src/@types/MessageType';
import { MessageReaction } from './@types/MessageReaction';

@Entity({ name: 'conversation' })
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: ObjectID;

	@Column({ name: 'conversation_id' })
	conversationId: number;

	@Column({ name: 'sender_id' })
	@Index()
	senderId: number;

	@Column({ name: 'content', length: 20000 })
	content: string;

	@Column()
	reactions: MessageReaction[];

	@Column()
	readers: MessageReader[];

	@Column({
		type: 'enum',
		enum: MessageStatus,
		default: MessageStatus.SENT
	})
	status: MessageStatus;

	@Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
	type: MessageType;
}
