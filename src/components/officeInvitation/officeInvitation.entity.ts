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

@Entity({ name: 'office_invitation' })
export class OfficeInvitation extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	@Index()
	token: string;

	@Column({ name: 'office_id' })
	officeId: string;

	@Column({ name: 'created_by_user_id' })
	createdByUserId: string;

	@Column({ name: 'invited_email' })
	invitedEmail: string;

	@Column({ name: 'expired_at' })
	expiredAt: Date;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'created_by_user_id' })
	createdBy: User;

	@ManyToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;
}
