import { Column, Entity, ObjectID, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { MessageReader } from './@types/MessageReader';
import { MessageStatus } from './@types/MessageStatus';

@Entity({ name: 'conversation' })
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: ObjectID;

	@Column({ name: 'conversation_id' })
	conversationId: number;

	@Column({ name: 'sender_id' })
	senderId: number;

	@Column({ name: 'content' })
	content: string;

	@Column()
	readers: MessageReader[];

	@Column()
	messageStatus: MessageStatus;

	@Column()
	type: number;
}
