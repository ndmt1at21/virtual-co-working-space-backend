import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import { Message } from '../messages/message.entity';
import { Office } from '../offices/office.entity';
import { User } from '../users/user.entity';
import { ConversationType } from './@types/ConversationType';

@Entity({ name: 'conversation' })
export class Conversation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'office_id' })
	officeId: number;

	@Column({ length: 100, nullable: true })
	name?: string;

	@Column({ length: 2000, nullable: true })
	description?: string;

	@Column({ name: 'latest_message_id', nullable: true })
	latestMessageId?: number;

	@Column({ name: 'creator_id' })
	creatorId?: number;

	@Column({
		type: 'enum',
		enum: ConversationType,
		default: ConversationType.OFFICE_LEVEL
	})
	type: ConversationType;

	@ManyToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;

	@OneToMany(
		() => ConversationMember,
		conversationMember => conversationMember.conversation,
		{ cascade: true }
	)
	conversationMembers: ConversationMember[];

	@OneToOne(type => Message, message => message.id)
	latestMessage?: Message;

	@ManyToOne(type => User, user => user.id)
	creator?: Message;
}
