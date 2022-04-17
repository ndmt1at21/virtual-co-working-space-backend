import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';

@Entity({ name: 'conversation' })
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'conversation_id' })
	conversationId: number;

	@Column({ name: 'sender_id' })
	senderId: number;

	@Column({ name: 'content' })
	content: string;

	@Column()
	type: number;
}
