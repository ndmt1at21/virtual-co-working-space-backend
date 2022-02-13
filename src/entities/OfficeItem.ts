import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Item } from './Item';
import { Office } from './Office';

@Entity({ name: 'office_item' })
export class OfficeItem extends BaseEntity {
	@OneToOne(() => Item)
	@JoinColumn({ name: 'itemId' })
	item: Item;

	@OneToOne(() => Office)
	@JoinColumn({ name: 'officeId' })
	office: Office;

	@Column()
	itemId: number;

	@Column()
	officeId: number;

	@Column()
	xRotation: number;

	@Column()
	yRotation: number;

	@Column()
	zRotation: number;

	@Column()
	xPosition: number;

	@Column()
	yPosition: number;

	@Column()
	zPosition: number;
}
