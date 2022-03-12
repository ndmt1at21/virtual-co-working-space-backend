import { OfficeItemDetailDto } from '@src/components/officeItems/@types/dto/OfficeItemDetail.dto';

export type OfficeDetailDto = {
	id: string;
	name: string;
	invitationCode: string;
	officeItems: OfficeItemDetailDto[];
	officeMembers: OfficeItemDetailDto[];
};
