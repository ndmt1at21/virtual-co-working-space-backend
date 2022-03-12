import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';

@Entity({ name: 'item' })
export class Item extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Index({})
	name: string;

	@Column({ unique: true, name: 'model_path' })
	modelPath: string;
}
