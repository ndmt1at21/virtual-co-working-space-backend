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
import { User } from './User';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'senderId' })
	sender: User;

	@ManyToOne(() => Conversation)
	@JoinColumn({ name: 'conversationId' })
	conversation: Conversation;

	@Column()
	senderId: number;

	@Column()
	conversationId: number;

	@Column()
	content: string;

	@Column()
	type: number;

	@Column()
	status: number;
}
