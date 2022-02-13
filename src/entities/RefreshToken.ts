import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'refresh_token' })
export class RefreshToken extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	token: string;

	@Column({ name: 'user_id' })
	userId: string;

	@Column({ name: 'expires_at' })
	expiresAt: Date;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
