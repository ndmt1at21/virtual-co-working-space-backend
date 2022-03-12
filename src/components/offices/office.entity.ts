import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { OfficeItem } from '../officeItems/officeItem.entity';
import { OfficeMember } from '../officeMembers/officeMember.entity';

@Entity({ name: 'office' })
export class Office extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true, name: 'invitation_code' })
	invitationCode: string;

	@OneToMany(() => OfficeItem, officeItem => officeItem.office)
	officeItems: OfficeItem[];

	@OneToMany(() => OfficeMember, officeMember => officeMember.office)
	officeMembers: OfficeMember[];
}
