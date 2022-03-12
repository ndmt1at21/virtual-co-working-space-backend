import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { OfficeMember } from '../officeMembers/officeMember.entity';

@Entity({ name: 'office_member_transform' })
export class OfficeMemberTransform extends BaseEntity {
	@Column({ name: 'x_rotation', default: 0 })
	xRotation: number;

	@Column({ name: 'y_rotation', default: 0 })
	yRotation: number;

	@Column({ name: 'z_rotation', default: 0 })
	zRotation: number;

	@Column({ name: 'x_position', default: 0 })
	xPosition: number;

	@Column({ name: 'y_position', default: 0 })
	yPosition: number;

	@Column({ name: 'z_position', default: 0 })
	zPosition: number;

	@OneToOne(() => OfficeMember, { primary: true })
	@JoinColumn()
	officeMember: OfficeMember;
}
