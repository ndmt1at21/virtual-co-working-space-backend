import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Conversation } from '@src/components/conversations/conversation.entity';
import { User } from '@components/users/user.entity';
import { BaseEntity } from '../base/BaseEntity';
import { Message } from '../messages/message.entity';

@Entity({ name: 'conversation_member' })
export class ConversationMember extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'conversation_id' })
	conversationId: number;

	@Column({ name: 'member_id' })
	memberId: number;

	@Column({ name: 'number_of_unread_messages', default: 0 })
	numberOfUnreadMessages: number;

	@Column({ name: 'is_typing', default: false })
	isTyping: boolean;

	@ManyToOne(() => Conversation)
	@JoinColumn({ name: 'conversation_id' })
	conversation: Conversation;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'member_id' })
	member: User;
}
