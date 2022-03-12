import { Transform3D } from '../Transform3D';

export type OfficeItemOverviewDto = {
	id: string;
	itemId: string;
	officeId: string;
	transform: Transform3D;
};
