import { MessageStatus } from '@src/@types/MessageStatus';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'message_state' })
export class MessageState extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'message_id' })
	messageId: number;

	@Column({ type: 'enum' })
	status: MessageStatus;
}
