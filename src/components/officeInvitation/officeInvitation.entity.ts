import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { User } from '@components/users/user.entity';
import { Office } from '@components/offices/office.entity';
import { OfficeInvitationType } from './@types/OfficeInvitationType';

@Entity({ name: 'office_invitation' })
export class OfficeInvitation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	@Index()
	token: string;

	@Column({ name: 'office_id' })
	officeId: number;

	@Column({ name: 'created_by_user_id' })
	createdByUserId: number;

	@Column({ name: 'invited_email' })
	invitedEmail?: string;

	@Column({ name: 'expired_at' })
	expiredAt: Date;

	@Column({ type: 'enum', enum: OfficeInvitationType })
	type: OfficeInvitationType;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'created_by_user_id' })
	createdBy: User;

	@ManyToOne(() => Office, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'office_id' })
	office: Office;
}
