import {
	Column,
	Entity,
	Index,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { User } from '../users/user.entity';

@Entity({ name: 'active_user_token' })
@Index(['token'], { unique: true })
export class ActiveUserToken extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ unique: true })
	token: string;

	@OneToOne(() => User)
	user: User;
}
