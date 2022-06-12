import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique
} from 'typeorm';
import { Conversation } from '@src/components/conversations/conversation.entity';
import { User } from '@components/users/user.entity';
import { BaseEntity } from '../base/BaseEntity';
import { ConversationMemberStatus } from './@types/ConversationMemberStatus';

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

	@Column({
		name: 'status',
		type: 'enum',
		enum: ConversationMemberStatus,
		default: ConversationMemberStatus.ACTIVE
	})
	status: ConversationMemberStatus;

	@ManyToOne(() => Conversation, conversation => conversation.id)
	@JoinColumn({ name: 'conversation_id' })
	conversation: Conversation;

	@ManyToOne(() => User, user => user.id)
	@JoinColumn({ name: 'member_id' })
	member: User;
}
