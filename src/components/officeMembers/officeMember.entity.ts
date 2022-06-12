import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Office } from '@src/components/offices/office.entity';
import { User } from '@components/users/user.entity';
import { BaseEntity } from '@components/base/BaseEntity';
import { OfficeMemberTransform } from '@components/officeMemberTransform/officeMemberTransform.entity';
import { OfficeMemberOnlineStatus } from './@types/OfficeMemberOnlineStatus';
import { OfficeMemberRole } from '../officeMemberRole/officeMemberRole.entity';
import { OfficeMemberStatus } from './@types/OfficeMemberStatus';

@Entity({ name: 'office_member' })
export class OfficeMember extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'member_id' })
	memberId: number;

	@Column({ name: 'office_id' })
	officeId: number;

	@Column({
		name: 'online_status',
		type: 'enum',
		enum: OfficeMemberOnlineStatus,
		default: OfficeMemberOnlineStatus.OFFLINE
	})
	onlineStatus: OfficeMemberOnlineStatus;

	@Column({
		name: 'status',
		type: 'enum',
		enum: OfficeMemberStatus,
		default: OfficeMemberStatus.ACTIVE
	})
	status: OfficeMemberStatus;

	@Column({ name: 'last_active_at', default: () => 'NOW()' })
	lastActiveAt: Date;

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'member_id' })
	member: User;

	@ManyToOne(() => Office, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'office_id' })
	office: Office;

	@OneToMany(
		() => OfficeMemberRole,
		officeMemberRole => officeMemberRole.officeMember,
		{ cascade: true }
	)
	roles: OfficeMemberRole[];

	@OneToOne(
		() => OfficeMemberTransform,
		officeTransform => officeTransform.officeMember,
		{ cascade: true }
	)
	transform: OfficeMemberTransform;
}
