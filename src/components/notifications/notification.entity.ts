import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '@components/users/user.entity';
import { NotificationObject } from './components/notificationObject/notificationObject.entity';
import { BaseEntity } from '../base/BaseEntity';

@Entity({ name: 'notification' })
export class Notification extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'notification_object_id' })
	@Index()
	notificationObjectId: number;

	@Column({ name: 'notifier_id' })
	@Index()
	notifierId: number;

	@ManyToOne(() => NotificationObject, { cascade: true })
	@JoinColumn({ name: 'notification_object_id' })
	notificationObject: NotificationObject;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'notifier_id' })
	notifier: User;
}
