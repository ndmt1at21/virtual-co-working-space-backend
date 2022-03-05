import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '@components/users/user.entity';
import { RefreshTokenStatus } from './@types/RefreshTokenStatus';
import { BaseEntity } from '@components/base/BaseEntity';

@Entity({ name: 'refresh_token' })
@Index(['token', 'userId'], { unique: true })
export class RefreshToken extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	token: string;

	@Column({ name: 'user_id' })
	userId: string;

	@Column({
		type: 'enum',
		enum: RefreshTokenStatus,
		default: RefreshTokenStatus.ACTIVE
	})
	status: RefreshTokenStatus;

	@Column({ name: 'expires_at' })
	expiresAt: Date;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
