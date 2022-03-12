import { OfficeItemRepository } from '../officeItems/officeItem.repository';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { OfficeRepository } from './office.repository';

export const OfficeService = (
	officeItemRepository: OfficeItemRepository,
	officeMemberRepository: OfficeMemberRepository,
	officeRepository: OfficeRepository
) => {
	const findOfficeOverviewById = async (id: string) => {};

	const findOfficeDetailById = async (id: string) => {
		const office = await officeRepository
			.createQueryBuilder('office')
			.where('office.id = :id', { id })
			.leftJoin('office.officeItems', 'office_item')
			.leftJoin('office.officeMembers', 'office_member')
			.getOne();

		return {};
	};

	return {};
};
