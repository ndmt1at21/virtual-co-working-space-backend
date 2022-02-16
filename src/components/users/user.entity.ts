import { UserRoleType } from '@src/@types/UserRoleType';
import { UserStatus } from '@src/@types/UserStatus';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	phone?: string;

	@Column({ select: false })
	password: string;

	@Column()
	avatar: string;

	@Column({ type: 'enum' })
	type: UserRoleType;

	@Column({ type: 'enum' })
	status: UserStatus;
}
