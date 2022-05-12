import { IllegalArgumentError } from '@src/utils/appError';
import { IOfficeMemberValidate } from './@types/IOfficeMemberValidate';
import { OfficeMemberErrorMessages } from './officeMember.error';
import { OfficeMemberRepository } from './officeMember.repository';

export class OfficeMemberValidate implements IOfficeMemberValidate {
	constructor(
		private readonly officeMemberRepository: OfficeMemberRepository
	) {}

	checkExistsOfficeMemberById = async (id: number): Promise<void> => {
		const isExisted =
			await this.officeMemberRepository.existsOfficeMemberById(id);

		if (!isExisted) {
			throw new IllegalArgumentError(
				OfficeMemberErrorMessages.OFFICE_MEMBER_NOT_FOUND
			);
		}
	};

	checkUniqueUserInOffice = async (
		userId: number,
		officeId: number
	): Promise<void> => {
		const memberExisted =
			await this.officeMemberRepository.existsUserInOffice(
				userId,
				officeId
			);

		if (memberExisted) {
			throw new IllegalArgumentError(
				OfficeMemberErrorMessages.USER_ALREADY_IN_OFFICE
			);
		}
	};
}
