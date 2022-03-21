import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';

@Entity({ name: 'office_role' })
export class OfficeRole extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	@Index()
	name: string;
}
