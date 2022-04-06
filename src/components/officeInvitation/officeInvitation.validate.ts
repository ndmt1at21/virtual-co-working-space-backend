import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import {
	CreateOfficeInvitationByEmailDto,
	CreatePublicOfficeInvitationDto
} from './@types/dto/CreateOfficeInvitation.dto';
import { IOfficeInvitationValidate } from './@types/IOfficeInvitationValidate';
import { OfficeInvitation } from './officeInvitation.entity';
import { OfficeInvitationErrorMessages } from './officeInvitation.error';
import { OfficeInvitationRepository } from './officeInvitation.repository';

export const OfficeInvitationValidate = (
	officeInvitationRepository: OfficeInvitationRepository,
	officeMemberRepository: OfficeMemberRepository
): IOfficeInvitationValidate => {
	const checkCreateInvitationTokenByEmailData = async (
		invitationDto: CreateOfficeInvitationByEmailDto
	): Promise<void> => {
		const { invitedEmail, inviterId, officeId } = invitationDto;
		await checkInviterInOffice(inviterId, officeId);
		await checkInvitedEmailIsNotAlreadyMember(invitedEmail, officeId);
	};

	const checkCreatePublicInvitationTokenData = async (
		invitationDto: CreatePublicOfficeInvitationDto
	): Promise<void> => {
		const { inviterId, officeId } = invitationDto;
		await checkInviterInOffice(inviterId, officeId);
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

	const checkInvitationExistsByInvitedEmailAndInvitationToken = async (
		invitedEmail: string,
		token: string
	): Promise<void> => {
		const invitation =
			await officeInvitationRepository.findOfficeInvitationByInvitedEmailAndInvitationToken(
				invitedEmail,
				token
			);

		checkInvitationExists(invitation);
		checkInvitationNotExpired(invitation!);
	};

	async function checkInvitedEmailIsNotAlreadyMember(
		invitedEmail: string,
		officeId: number
	): Promise<void> {
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
	): Promise<void> {
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
		checkCreateInvitationTokenByEmailData,
		checkCreatePublicInvitationTokenData,
		checkUserCanJoinByInvitationToken
	};
};
