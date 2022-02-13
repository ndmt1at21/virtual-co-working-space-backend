import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Office } from './Office';
import { User } from './User';

@Entity({ name: 'checkin' })
export class CheckIn extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'userId' })
	user: User;

	@OneToOne(() => Office)
	@JoinColumn({ name: 'officeId' })
	office: Office;

	@Column()
	userId: number;

	@Column()
	officeId: number;
}
