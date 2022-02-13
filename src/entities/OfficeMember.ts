import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Office } from './Office';
import { OfficeRole } from './OfficeRole';
import { User } from './User';

@Entity({ name: 'office_member' })
export class OfficeMember extends BaseEntity {
	@OneToOne(() => User)
	@JoinColumn({ name: 'userId' })
	user: User;

	@OneToOne(() => Office)
	@JoinColumn({ name: 'officeId' })
	office: Office;

	@OneToOne(() => OfficeRole)
	@JoinColumn({ name: 'officeRoleId' })
	officeRole: OfficeRole;

	@Column()
	userId: number;

	@Column()
	officeId: number;

	@Column()
	officeRoleId: number;

	@Column()
	xRotation: number;

	@Column()
	yRotation: number;

	@Column()
	zRotation: number;

	@Column()
	xPosition: number;

	@Column()
	yPosition: number;

	@Column()
	zPosition: number;
}
