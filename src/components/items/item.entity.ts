import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';

@Entity({ name: 'item' })
export class Item extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Index({})
	name: string;

	@Column({ name: 'model_path' })
	modelPath: string;
}
