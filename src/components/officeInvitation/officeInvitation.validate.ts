import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { OfficeRepository } from '../offices/office.repository';
import { UserRepository } from '../users/user.repository';
import { CreatePrivateInvitationDto } from './@types/dto/CreatePrivateInvitation.dto';
import { IOfficeInvitationValidate } from './@types/IOfficeInvitationValidate';
import { OfficeInvitationErrorMessages } from './officeInvitation.error';
import { OfficeInvitationRepository } from './officeInvitation.repository';

type OfficeInvitationValidateParams = {
	officeInvitationRepository: OfficeInvitationRepository;
	officeRepository: OfficeRepository;
	officeMemberRepository: OfficeMemberRepository;
	userRepository: UserRepository;
};

export const OfficeInvitationValidate = ({
	officeInvitationRepository,
	officeRepository,
	officeMemberRepository,
	userRepository
}: OfficeInvitationValidateParams): IOfficeInvitationValidate => {
	const checkCreatePrivateInvitation = async (
		invitationDto: CreatePrivateInvitationDto
	): Promise<void> => {
		const { email, inviterId, officeId } = invitationDto;

		await checkInviterInOffice(inviterId, officeId);
		await checkUserIsNotMemberByEmail(email, officeId);
	};

	const checkUserCanJoinByPrivateInvitation = async (
		userId: number,
		token: string
	): Promise<void> => {
		// check user exists
		const user = await userRepository.findById(userId);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		// user should has an invitation
		const officeInvitation =
			await officeInvitationRepository.findOfficeInvitationByInvitedEmailAndInvitationToken(
				user.email,
				token
			);

		if (!officeInvitation) {
			throw new NotFoundError(
				OfficeInvitationErrorMessages.INVITATION_NOT_FOUND
			);
		}

		if (officeInvitation.expiredAt.getTime() < Date.now()) {
			throw new IllegalArgumentError(
				OfficeInvitationErrorMessages.INVITATION_EXPIRED
			);
		}

		// user is not already member of the office
		await checkUserIsNotMember(userId, officeInvitation.officeId);
	};

	const checkUserCanJoinByPublicInvitation = async (
		userId: number,
		inviteCode: string
	): Promise<void> => {
		// check office exists
		const office = await officeRepository
			.queryBuilder()
			.findByInvitationCode(inviteCode)
			.build()
			.getOne();

		if (!office)
			throw new NotFoundError(
				OfficeInvitationErrorMessages.INVITATION_NOT_FOUND
			);

		// check user is not already member of the office
		await checkUserIsNotMember(userId, office.id);
	};

	async function checkUserIsNotMember(
		userId: number,
		officeId: number
	): Promise<void> {
		const userExists = await officeMemberRepository.existsUserInOffice(
			userId,
			officeId
		);

		if (userExists) {
			throw new IllegalArgumentError(
				OfficeInvitationErrorMessages.ALREADY_INVITED
			);
		}
	}

	async function checkUserIsNotMemberByEmail(
		userEmail: string,
		officeId: number
	): Promise<void> {
		const officeMember =
			await officeMemberRepository.existsUserEmailInOffice(
				userEmail,
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

	return {
		checkCreatePrivateInvitation,
		checkUserCanJoinByPrivateInvitation,
		checkUserCanJoinByPublicInvitation
	};
};
