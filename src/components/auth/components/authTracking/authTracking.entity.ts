import { BaseEntity } from '@src/components/base/BaseEntity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth_tracking' })
export class AuthTracking extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	@Index({ unique: true })
	userId: number;

	@Column({ name: 'ip_address' })
	ipAddress: string;

	@Column({ name: 'last_login' })
	lastLogin: Date;

	@Column({ name: 'last_logout' })
	lastLogout?: Date;
}
