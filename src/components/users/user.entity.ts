import { UserRoleType } from '@src/@types/UserRoleType';
import { UserStatus } from '@src/@types/UserStatus';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';
import { UserLoginProvider } from './@types/UserLoginProvider';

@Entity({ name: 'user' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	@Index('email_idx', { unique: true })
	email: string;

	@Column({ nullable: true })
	phone?: string;

	@Column({ nullable: true })
	password?: string;

	@Column()
	avatar: string;

	@Column({ type: 'enum', enum: UserLoginProvider })
	provider: UserLoginProvider;

	@Column({ unique: true, nullable: true, name: 'external_id' })
	externalId?: string;

	@Column({ unique: true, nullable: true, name: 'password_reset_token' })
	passwordResetToken?: string;

	@Column({ nullable: true, name: 'password_reset_token_expired' })
	passwordResetTokenExpired?: Date;

	@Column({ type: 'enum', enum: UserRoleType, default: UserRoleType.USER })
	type: UserRoleType;

	@Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
	status: UserStatus;
}
