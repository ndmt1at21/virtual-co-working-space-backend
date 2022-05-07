import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base/BaseEntity';

@Entity({ name: 'accessory' })
export class Accessory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	path: string;

	@Column({ nullable: true })
	description?: string;
}
