import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';
import { Item } from '../items/item.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'item_category' })
export class ItemCategory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ length: 2000, nullable: true })
	description?: string;

	@Column({ name: 'creator_id' })
	creatorId?: number;

	@ManyToOne(type => User)
	@JoinColumn({ name: 'creator_id' })
	creator: User;

	@OneToMany(type => Item, item => item.category)
	items: Item[];
}
