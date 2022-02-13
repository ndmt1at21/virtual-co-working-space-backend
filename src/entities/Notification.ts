import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'notification' })
export class Notification extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'userId' })
	user: User;

	@Column()
	userId: number;

	@Column()
	image?: string;

	@Column()
	title: string;

	@Column()
	content: string;
}
