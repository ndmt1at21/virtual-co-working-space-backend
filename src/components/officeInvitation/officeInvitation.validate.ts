import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { CreateOfficeInvitationDto } from './@types/dto/CreateOfficeInvitation.dto';
import { IOfficeInvitationValidate } from './@types/IOfficeInvitationValidate';
import { OfficeInvitation } from './officeInvitation.entity';
import { OfficeInvitationErrorMessages } from './officeInvitation.error';
import { OfficeInvitationRepository } from './officeInvitation.repository';

export const OfficeInvitationValidate = (
	officeInvitationRepository: OfficeInvitationRepository,
	officeMemberRepository: OfficeMemberRepository
): IOfficeInvitationValidate => {
	const checkCreateInvitationTokenData = async (
		invitationDto: CreateOfficeInvitationDto
	): Promise<void> => {
		const { inviteEmail, inviterId, officeId } = invitationDto;
		await checkInviterInOffice(inviterId, officeId);
		await checkInvitedEmailIsNotAlreadyMember(inviteEmail, officeId);
	};

	const checkUserCanJoinByInvitationToken = async (
		invitedEmail: string,
		invitationToken: string
	): Promise<void> => {
		await checkInvitationTokenExistsAndNotExpired(
			invitedEmail,
			invitationToken
		);
	};

	async function checkInvitedEmailIsNotAlreadyMember(
		invitedEmail: string,
		officeId: number
	) {
		const officeMember =
			await officeMemberRepository.findOfficeMemberByMemberEmailAndOfficeId(
				invitedEmail,
				officeId
			);

		if (officeMember) {
			throw new IllegalArgumentError(
				OfficeInvitationErrorMessages.ALREADY_INVITED
			);
		}
	}

	async function checkInviterInOffice(inviterId: number, officeId: number) {
		const officeMemberExists =
			await officeMemberRepository.existsUserInOffice(
				inviterId,
				officeId
			);

		if (!officeMemberExists)
			throw new IllegalArgumentError(
				OfficeInvitationErrorMessages.INVITER_NOT_IN_OFFICE
			);
	}

	async function checkInvitationTokenExistsAndNotExpired(
		invitedEmail: string,
		invitationToken: string
	) {
		const officeInvitation =
			await officeInvitationRepository.findOfficeInvitationByInvitedEmailAndInvitationToken(
				invitedEmail,
				invitationToken
			);

		checkInvitationExists(officeInvitation);
		checkInvitationNotExpired(officeInvitation!);
	}

	function checkInvitationExists(
		officeInvitation: OfficeInvitation | undefined
	) {
		if (!officeInvitation) {
			throw new NotFoundError(OfficeInvitationErrorMessages.NOT_FOUND);
		}
	}

	function checkInvitationNotExpired(officeInvitation: OfficeInvitation) {
		if (officeInvitation.expiredAt.getTime() < Date.now()) {
			throw new IllegalArgumentError(
				OfficeInvitationErrorMessages.EXPIRED
			);
		}
	}

	return {
		checkCreateInvitationTokenData,
		checkUserCanJoinByInvitationToken
	};
};
