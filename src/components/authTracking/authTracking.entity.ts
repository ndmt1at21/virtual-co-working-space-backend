import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';

@Entity({ name: 'auth_tracking' })
export class AuthTracking extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'user_id' })
	@Index({ unique: true })
	userId: string;

	@Column({ name: 'last_login' })
	lastLogin?: Date;

	@Column({ name: 'last_logout' })
	lastLogout?: Date;
}
