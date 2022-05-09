import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { AccessoryCategory } from '../accessoryCategories/accessoryCategory.entity';
import { BaseEntity } from '../base/BaseEntity';

@Entity({ name: 'accessory' })
export class Accessory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	path: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;

	@Column({ name: 'creator_id' })
	creatorId: number;

	@Column({ name: 'category_id' })
	categoryId: number;

	@ManyToOne(type => AccessoryCategory)
	@JoinColumn({ name: 'category_id' })
	category: AccessoryCategory;
}
