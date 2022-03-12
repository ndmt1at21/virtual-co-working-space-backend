import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Conversation } from '@src/components/conversations/conversation.entity';
import { User } from '@components/users/user.entity';

@Entity({ name: 'conversation_member' })
export class ConversationMember extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'conversation_id' })
	conversationId: number;

	@Column({ name: 'member_id' })
	memberId: number;

	@OneToOne(() => Conversation)
	@JoinColumn({ name: 'conversation_id' })
	conversation: Conversation;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'member_id' })
	member: User;
}
