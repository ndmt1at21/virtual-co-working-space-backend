import { NotificationType } from '@src/@types/NotificationType';
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

	@Column({ nullable: true })
	image?: string;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column()
	link: string;

	@Column({ type: 'enum' })
	type: NotificationType;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
