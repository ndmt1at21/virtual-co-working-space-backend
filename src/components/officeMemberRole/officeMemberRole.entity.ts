import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { OfficeMember } from '../officeMembers/officeMember.entity';
import { OfficeRole } from '../officeRoles/officeRole.entity';

@Entity({ name: 'office_member_role' })
export class OfficeMemberRole extends BaseEntity {
	@PrimaryColumn({ name: 'office_member_id' })
	officeMemberId: string;

	@PrimaryColumn({ name: 'office_role_id' })
	officeRoleId: string;

	@ManyToOne(() => OfficeMember, officeMember => officeMember.roles)
	@JoinColumn({ name: 'office_member_id' })
	officeMember: OfficeMember;

	@ManyToOne(() => OfficeRole)
	@JoinColumn({ name: 'office_role_id' })
	officeRole: OfficeRole;
}
