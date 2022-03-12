import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Office } from '@src/components/offices/office.entity';
import { OfficeRole } from '@src/components/officeRoles/officeRole.entity';
import { User } from '../users/user.entity';
import { BaseEntity } from '../base/BaseEntity';

@Entity({ name: 'office_member' })
export class OfficeMember extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@PrimaryColumn({ name: 'member_id' })
	memberId: string;

	@PrimaryColumn({ name: 'office_id' })
	officeId: string;

	@Column({ name: 'office_role_id' })
	officeRoleId: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	member: User;

	@ManyToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;

	@ManyToOne(() => OfficeRole)
	@JoinColumn({ name: 'office_role_id' })
	officeRole: OfficeRole;
}
