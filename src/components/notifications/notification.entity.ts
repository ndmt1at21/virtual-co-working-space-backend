import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '@components/users/user.entity';
import { NotificationObject } from './components/notificationObject/notificationObject.entity';

@Entity({ name: 'notification' })
export class Notification extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'notification_object_id' })
	notificationObjectId: number;

	@Column({ name: 'actor_id' })
	actorId: number;

	@Column({ name: 'notifiers', type: 'array' })
	notifiers: number[];

	@OneToOne(type => NotificationObject)
	@JoinColumn({ name: 'notification_object_id' })
	notificationObject: NotificationObject;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'actor_id' })
	actor: User;
}
