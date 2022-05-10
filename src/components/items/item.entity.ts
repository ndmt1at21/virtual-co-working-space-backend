import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';
import { ItemCategory } from '../itemCategories/itemCategory.entity';

@Entity({ name: 'item' })
export class Item extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Index({})
	name: string;

	@Column({ name: 'category_id' })
	categoryId: number;

	@Column({ name: 'model_path' })
	modelPath: string;

	@Column({ name: 'image', nullable: true })
	image?: string;

	@ManyToOne(type => ItemCategory)
	@JoinColumn({ name: 'category_id' })
	category: ItemCategory;
}
