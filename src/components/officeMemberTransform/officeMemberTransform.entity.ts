import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { OfficeMember } from '../officeMembers/officeMember.entity';

@Entity({ name: 'office_member_transform' })
export class OfficeMemberTransform extends BaseEntity {
	@PrimaryColumn({ name: 'office_member_id' })
	officeMemberId: number;

	@Column({ name: 'x_rotation', default: 0, type: 'float' })
	xRotation: number;

	@Column({ name: 'y_rotation', default: 0, type: 'float' })
	yRotation: number;

	@Column({ name: 'z_rotation', default: 0, type: 'float' })
	zRotation: number;

	@Column({ name: 'x_position', default: 0, type: 'float' })
	xPosition: number;

	@Column({ name: 'y_position', default: 0, type: 'float' })
	yPosition: number;

	@Column({ name: 'z_position', default: 0, type: 'float' })
	zPosition: number;

	@OneToOne(() => OfficeMember)
	@JoinColumn({ name: 'office_member_id' })
	officeMember: OfficeMember;
}
