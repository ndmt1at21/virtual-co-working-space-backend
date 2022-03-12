import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@src/components/base/BaseEntity';

@Entity({ name: 'office_role' })
export class OfficeRole extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({ unique: true })
	name: string;
}
