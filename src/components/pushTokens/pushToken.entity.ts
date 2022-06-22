import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { User } from '../users/user.entity';
import { PushTokenDevice } from './@types/PushTokenDevice';

@Entity({ name: 'push_token' })
export class PushToken extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'user_id' })
	@Index()
	userId: number;

	@Column({ name: 'token', unique: true })
	token: string;

	@Column({
		name: 'device_type',
		type: 'enum',
		enum: PushTokenDevice
	})
	deviceType: PushTokenDevice;

	@Column({ name: 'expired_at' })
	expiredAt: Date;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
