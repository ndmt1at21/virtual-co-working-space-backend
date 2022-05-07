import { getManager } from 'typeorm';
import { OfficeMember } from '../officeMembers/officeMember.entity';
import { OfficeRoleType } from '../officeRoles/@types/OfficeRoleType';
import { Office } from '../offices/office.entity';
import { CreatePrivateInvitationDto } from './@types/dto/CreatePrivateInvitation.dto';
import { OfficeInvitationDto } from './@types/dto/OfficeInvitation.dto';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';
import { OfficeInvitationServiceParams } from './@types/OfficeInvitationServiceParams';
import { OfficeInvitation } from './officeInvitation.entity';

export const OfficeInvitationService = ({
	officeInvitationRepository,
	officeRepository,
	officeMemberRepository,
	officeRoleRepository,
	officeInvitationCreator,
	officeInvitationValidate,
	officeInvitationTokenGenerator
}: OfficeInvitationServiceParams): IOfficeInvitationService => {
	const createPrivateInvitation = async (
		createInvitationDto: CreatePrivateInvitationDto
	): Promise<OfficeInvitationDto> => {
		await officeInvitationValidate.checkCreatePrivateInvitation(
			createInvitationDto
		);

		const { inviterId, email, officeId } = createInvitationDto;
		const token = officeInvitationTokenGenerator.generate();

		await officeInvitationRepository.save({
			createdByUserId: inviterId,
			officeId,
			invitedEmail: email,
			token,
			expiredAt: new Date(Date.now() + 30 * 60 * 1000)
		});

		return officeInvitationCreator.createPrivateOfficeInvitationByToken(
			token
		);
	};

	const findPrivateInvitation = async (
		userId: number,
		token: string
	): Promise<OfficeInvitationDto> => {
		await officeInvitationValidate.checkUserCanJoinByPrivateInvitation(
			userId,
			token
		);

		const officeInvitation =
			await officeInvitationCreator.createPrivateOfficeInvitationByToken(
				token
			);

		return officeInvitation;
	};

	const findPublicInvitation = async (
		userId: number,
		inviteCode: string
	): Promise<OfficeInvitationDto> => {
		await officeInvitationValidate.checkUserCanJoinByPublicInvitation(
			userId,
			inviteCode
		);

		const officeInvitation =
			await officeInvitationCreator.createPublicOfficeInvitation(
				inviteCode
			);

		return officeInvitation;
	};

	const acceptPrivateInvitation = async (
		userId: number,
		inviteToken: string
	): Promise<void> => {
		await officeInvitationValidate.checkUserCanJoinByPrivateInvitation(
			userId,
			inviteToken
		);

		const officeInvitation =
			await officeInvitationRepository.findByInvitationToken(inviteToken);

		const memberRole = await officeRoleRepository.findOfficeRoleByName(
			OfficeRoleType.MEMBER
		);

		getManager().transaction(async transactionManager => {
			const officeMember = officeMemberRepository.create({
				officeId: officeInvitation!.officeId,
				memberId: userId,
				roles: [{ officeRoleId: memberRole!.id }],
				transform: {}
			});

			await transactionManager.save<OfficeMember>(officeMember);
			await transactionManager.increment(
				Office,
				{ id: officeInvitation!.officeId },
				'numberOfMembers',
				1
			);
			await transactionManager.remove(OfficeInvitation, officeInvitation);
		});
	};

	const acceptPublicInvitation = async (
		userId: number,
		inviteCode: string
	): Promise<void> => {
		await officeInvitationValidate.checkUserCanJoinByPublicInvitation(
			userId,
			inviteCode
		);

		const office = await officeRepository
			.queryBuilder()
			.findByInvitationCode(inviteCode)
			.build()
			.getOne();

		const memberRole = await officeRoleRepository.findOfficeRoleByName(
			OfficeRoleType.MEMBER
		);

		await officeMemberRepository.saveOfficeMember({
			officeId: office!.id,
			memberId: userId,
			transform: {},
			roles: [{ officeRoleId: memberRole!.id }]
		});
	};

	const deleteInvitation = async (inviteToken: string): Promise<void> => {};

	return {
		createPrivateInvitation,
		findPrivateInvitation,
		findPublicInvitation,
		acceptPrivateInvitation,
		acceptPublicInvitation,
		deleteInvitation
	};
};
