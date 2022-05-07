import { BaseEntity } from '@src/components/base/BaseEntity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Accessory } from '../accessories/accessory.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'accessory_category' })
export class AccessoryCategory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ name: 'creator_id' })
	creatorId: number;

	@Column({ nullable: true })
	description?: string;

	@ManyToOne(type => User)
	@JoinColumn({ name: 'creator_id' })
	creator: User;

	@OneToMany(type => Accessory, accessory => accessory.category)
	accessories: Accessory[];
}
