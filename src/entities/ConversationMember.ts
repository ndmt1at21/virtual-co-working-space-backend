import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Conversation } from './Conversation';
import { User } from './User';

@Entity({ name: 'conversation_member' })
export class ConversationMember extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Conversation)
	@JoinColumn({ name: 'conversationId' })
	conversation: Conversation;

	@OneToOne(() => User)
	@JoinColumn({ name: 'memberId' })
	member: User;

	@Column()
	conversationId: number;

	@Column()
	memberId: number;
}
