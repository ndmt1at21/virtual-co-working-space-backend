import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '@components/users/user.entity';

@Entity({ name: 'notification_type' })
export class NotificationType extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'name' })
	@Index()
	name: string;

	@Column({ name: 'description' })
	description?: string;
}
