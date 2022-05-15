import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { Conversation } from '../conversations/conversation.entity';
import { OfficeItem } from '../officeItems/officeItem.entity';
import { OfficeMember } from '../officeMembers/officeMember.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'office' })
export class Office extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true, name: 'invitation_code' })
	@Index()
	invitationCode: string;

	@Column({ name: 'created_by_user_id' })
	@Index()
	createdByUserId: number;

	@Column({ name: 'avatar_url', nullable: true })
	avatarUrl?: string;

	@Column({ name: 'description', nullable: true })
	description?: string;

	@Column({ name: 'number_of_members', default: 0 })
	numberOfMembers: number;

	@Column({ name: 'number_of_items', default: 0 })
	numberOfItems: number;

	@Column({ name: 'is_blocked', default: false })
	isBlocked: boolean;

	@Column({ name: 'blocked_at', nullable: true })
	blockedAt?: Date;

	@OneToMany(() => OfficeItem, officeItem => officeItem.office, {
		cascade: true
	})
	officeItems: OfficeItem[];

	@OneToMany(() => OfficeMember, officeMember => officeMember.office, {
		cascade: true
	})
	officeMembers: OfficeMember[];

	@OneToMany(() => Conversation, conversation => conversation.office, {
		cascade: true
	})
	@JoinColumn({ name: 'conversation_id' })
	conversations: Conversation[];

	@ManyToOne(() => User)
	@JoinColumn({ name: 'created_by_user_id' })
	createdBy: User;
}
