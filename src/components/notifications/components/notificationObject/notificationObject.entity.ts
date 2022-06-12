import { BaseEntity } from '@src/components/base/BaseEntity';
import { User } from '@src/components/users/user.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Notification } from '../../notification.entity';
import { EntityType } from '../entityType/entityType.entity';

@Entity({ name: 'notification_object' })
export class NotificationObject extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'entity_type_id' })
	entityTypeId: number;

	@Column({ name: 'entity_id' })
	entityId: number;

	@Column({ name: 'actor_id' })
	actorId: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'actor_id' })
	actor: User;

	@ManyToOne(() => EntityType)
	@JoinColumn({ name: 'entity_type_id' })
	entityType: EntityType;

	@OneToMany(
		() => Notification,
		notification => notification.notificationObject
	)
	notifications: Notification[];

	dataOfEntity: any;
}
