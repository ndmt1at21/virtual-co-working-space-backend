import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { OfficeItem } from '../officeItems/officeItem.entity';
import { OfficeMember } from '../officeMembers/officeMember.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'office' })
export class Office extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true, name: 'invitation_code' })
	@Index()
	invitationCode: string;

	@Column({ name: 'created_by_user_id' })
	@Index()
	createdByUserId: number;

	@OneToMany(() => OfficeItem, officeItem => officeItem.office, {
		cascade: true
	})
	officeItems: OfficeItem[];

	@OneToMany(() => OfficeMember, officeMember => officeMember.office, {
		cascade: true
	})
	officeMembers: OfficeMember[];

	@ManyToOne(() => User)
	@JoinColumn({ name: 'created_by_user_id' })
	createdBy: User;
}
