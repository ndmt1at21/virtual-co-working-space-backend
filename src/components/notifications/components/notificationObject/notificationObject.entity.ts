import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notification_object' })
export class NotificationObject extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'entity_type' })
	entityType: string;

	@Column({ name: 'entity_id' })
	entityId: number;
}
