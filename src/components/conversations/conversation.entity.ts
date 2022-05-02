import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import { Office } from '../offices/office.entity';
import { ConversationType } from './@types/ConversationType';

@Entity({ name: 'conversation' })
export class Conversation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'office_id' })
	officeId: number;

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
}
