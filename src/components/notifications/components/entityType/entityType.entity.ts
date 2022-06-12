import {
	BaseEntity,
	Column,
	Entity,
	Index,
	PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'entity_type' })
@Index(['name', 'action'], { unique: true })
export class EntityType extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'name' })
	name: string;

	@Column({ name: 'action' })
	action: string;
}
