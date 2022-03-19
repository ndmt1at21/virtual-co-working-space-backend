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

@Entity({ name: 'office_member' })
export class OfficeMember extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'member_id' })
	memberId: string;

	@Column({ name: 'office_id' })
	officeId: string;

	@Column({
		name: 'online_status',
		type: 'enum',
		enum: OfficeMemberOnlineStatus,
		default: OfficeMemberOnlineStatus.OFFLINE
	})
	onlineStatus: OfficeMemberOnlineStatus;

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
