import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';
import { User } from '../users/user.entity';

@Entity({ name: 'password_reset_token' })
export class PasswordResetToken extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	userId: number;

	@Column({ unique: true, name: 'password_reset_token' })
	passwordResetToken: string;

	@Column({ name: 'password_reset_token_expired' })
	passwordResetTokenExpired: Date;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
