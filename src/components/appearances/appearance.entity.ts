import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { User } from '../users/user.entity';

@Entity({ name: 'appearance' })
export class Appearance extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Index()
	key: string;

	@Column()
	value: number;

	@Column({ name: 'user_id' })
	@Index()
	userId: number;

	@ManyToOne(type => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
