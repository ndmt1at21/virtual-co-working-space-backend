import { BaseEntity } from '@src/components/base/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'accessory_category' })
export class AccessoryCategory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;
}
