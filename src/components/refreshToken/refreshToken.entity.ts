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
import { RefreshTokenStatus } from './@types/RefreshTokenStatus';

@Entity({ name: 'refresh_token' })
export class RefreshToken extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Index({ unique: true })
	token: string;

	@Column({ name: 'user_id', unique: true })
	userId: number;

	@Column({
		type: 'enum',
		enum: RefreshTokenStatus,
		default: RefreshTokenStatus.ACTIVE
	})
	status: RefreshTokenStatus;

	@Column({ name: 'expires_at' })
	expiresAt: Date;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
