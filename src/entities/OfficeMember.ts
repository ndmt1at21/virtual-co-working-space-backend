import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn
} from 'typeorm';
import { Office } from './Office';
import { OfficeRole } from './OfficeRole';
import { User } from './User';

@Entity({ name: 'office_member' })
export class OfficeMember extends BaseEntity {
	@PrimaryColumn({ name: 'user_id' })
	userId: number;

	@PrimaryColumn({ name: 'office_id' })
	officeId: number;

	@Column({ name: 'office_role_id' })
	officeRoleId: number;

	@Column({ name: 'x_rotation' })
	xRotation: number;

	@Column({ name: 'y_rotation' })
	yRotation: number;

	@Column({ name: 'z_rotation' })
	zRotation: number;

	@Column({ name: 'x_position' })
	xPosition: number;

	@Column({ name: 'y_position' })
	yPosition: number;

	@Column({ name: 'z_position' })
	zPosition: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;

	@OneToOne(() => OfficeRole)
	@JoinColumn({ name: 'office_role_id' })
	officeRole: OfficeRole;
}
