import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';
import { User } from '../users/user.entity';

@Entity({ name: 'password_reset_token' })
export class PasswordResetToken extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'user_id' })
	userId: string;

	@Column({ unique: true, name: 'password_reset_token' })
	passwordResetToken: string;

	@Column({ name: 'password_reset_token_expired' })
	passwordResetTokenExpired: Date;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
