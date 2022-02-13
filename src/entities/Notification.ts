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

	@Column({ name: 'user_id' })
	userId: number;

	@Column()
	image?: string;

	@Column()
	title: string;

	@Column()
	content: string;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
