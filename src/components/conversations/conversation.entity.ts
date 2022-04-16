import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import { Office } from '../offices/office.entity';

@Entity({ name: 'conversation' })
export class Conversation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'office_id' })
	officeId: number;

	@OneToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;

	@OneToMany(
		() => ConversationMember,
		conversationMember => conversationMember.conversation,
		{ cascade: true }
	)
	conversationMembers: ConversationMember[];
}
