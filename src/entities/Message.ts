import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Conversation } from './Conversation';
import { User } from '@components/users/user.entity';

export enum MessageType {
	TEXT = 'text'
}

@Entity({ name: 'message' })
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'sender_id' })
	senderId: number;

	@Column({ name: 'conversation_id' })
	conversationId: number;

	@Column()
	content: string;

	@Column()
	type: number;

	@Column()
	status: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'sender_id' })
	sender: User;

	@ManyToOne(() => Conversation)
	@JoinColumn({ name: 'conversation_id' })
	conversation: Conversation;
}
