import { BaseEntity } from '@src/components/base/BaseEntity';
import { User } from '@components/users/user.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Office } from '@src/components/offices/office.entity';

@Entity({ name: 'checkin' })
export class CheckIn extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'office_id' })
	officeId: number;

	@Column({ name: 'proof' })
	proof: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;
}
