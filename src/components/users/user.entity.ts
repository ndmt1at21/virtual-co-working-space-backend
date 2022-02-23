import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';
import { UserLoginProvider } from './@types/UserLoginProvider';
import { UserRoleType } from './@types/UserRoleType';
import { UserStatus } from './@types/UserStatus';

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

	@Column({ nullable: true })
	avatar?: string;

	@Column({
		type: 'enum',
		enum: UserLoginProvider,
		default: UserLoginProvider.LOCAL
	})
	provider: UserLoginProvider;

	@Column({ nullable: true, name: 'external_id' })
	externalId?: string;

	@Column({ type: 'enum', enum: UserRoleType, default: UserRoleType.USER })
	type: UserRoleType;

	@Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
	status: UserStatus;
}
