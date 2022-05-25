import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'notification_entity' })
export class NotificationEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'entity_id' })
	entityId: number;

	@Column({ name: 'description', nullable: true })
	description?: string;
}
