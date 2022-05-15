import { getManager } from 'typeorm';
import { OfficeMember } from '../officeMembers/officeMember.entity';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { OfficeRoleType } from '../officeRoles/@types/OfficeRoleType';
import { OfficeRoleRepository } from '../officeRoles/officeRole.repository';
import { Office } from '../offices/office.entity';
import { OfficeRepository } from '../offices/office.repository';
import { CreatePrivateInvitationDto } from './@types/dto/CreatePrivateInvitation.dto';
import { OfficeInvitationDto } from './@types/dto/OfficeInvitation.dto';
import { IOfficeInvitationCreator } from './@types/IOfficeInvitationCreator';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';
import { IOfficeInvitationValidate } from './@types/IOfficeInvitationValidate';
import { OfficeInvitationServiceProps } from './@types/OfficeInvitationServiceProps';
import { IOfficeInvitationTokenGenerator } from './components/officeInvitationTokenGenerator/@types/IOfficeInvitationTokenGenerator';
import { OfficeInvitation } from './officeInvitation.entity';
import { mapOfficeInvitationToOfficeInvitationDto } from './officeInvitation.mapping';
import { OfficeInvitationRepository } from './officeInvitation.repository';

export class OfficeInvitationService implements IOfficeInvitationService {
	private readonly officeInvitationRepository: OfficeInvitationRepository;
	private readonly officeRepository: OfficeRepository;
	private readonly officeMemberRepository: OfficeMemberRepository;
	private readonly officeRoleRepository: OfficeRoleRepository;
	private readonly officeInvitationCreator: IOfficeInvitationCreator;
	private readonly officeInvitationValidate: IOfficeInvitationValidate;
	private readonly officeInvitationTokenGenerator: IOfficeInvitationTokenGenerator;

	constructor(params: OfficeInvitationServiceProps) {
		this.officeInvitationRepository = params.officeInvitationRepository;
		this.officeRepository = params.officeRepository;
		this.officeMemberRepository = params.officeMemberRepository;
		this.officeRoleRepository = params.officeRoleRepository;
		this.officeInvitationCreator = params.officeInvitationCreator;
		this.officeInvitationValidate = params.officeInvitationValidate;
		this.officeInvitationTokenGenerator =
			params.officeInvitationTokenGenerator;
	}

	createPrivateInvitation = async (
		createInvitationDto: CreatePrivateInvitationDto
	): Promise<OfficeInvitationDto> => {
		await this.officeInvitationValidate.checkCreatePrivateInvitation(
			createInvitationDto
		);

		const { inviterId, email, officeId } = createInvitationDto;
		const token = this.officeInvitationTokenGenerator.generate();

		await this.officeInvitationRepository.save({
			createdByUserId: inviterId,
			officeId,
			invitedEmail: email,
			token,
			expiredAt: new Date(Date.now() + 30 * 60 * 1000)
		});

		return this.officeInvitationCreator.createPrivateOfficeInvitationByToken(
			token
		);
	};

	findPrivateInvitation = async (
		userId: number,
		token: string
	): Promise<OfficeInvitationDto> => {
		await this.officeInvitationValidate.checkUserCanJoinByPrivateInvitation(
			userId,
			token
		);

		const officeInvitation =
			await this.officeInvitationCreator.createPrivateOfficeInvitationByToken(
				token
			);

		return officeInvitation;
	};

	findPublicInvitation = async (
		userId: number,
		inviteCode: string
	): Promise<OfficeInvitationDto> => {
		await this.officeInvitationValidate.checkUserCanJoinByPublicInvitation(
			userId,
			inviteCode
		);

		const officeInvitation =
			await this.officeInvitationCreator.createPublicOfficeInvitation(
				inviteCode
			);

		return officeInvitation;
	};

	acceptPrivateInvitation = async (
		userId: number,
		inviteToken: string
	): Promise<void> => {
		await this.officeInvitationValidate.checkUserCanJoinByPrivateInvitation(
			userId,
			inviteToken
		);

		const officeInvitation =
			await this.officeInvitationRepository.findByInvitationToken(
				inviteToken
			);

		const memberRole = await this.officeRoleRepository.findOfficeRoleByName(
			OfficeRoleType.MEMBER
		);

		getManager().transaction(async transactionManager => {
			const officeMember = this.officeMemberRepository.create({
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

	acceptPublicInvitation = async (
		userId: number,
		inviteCode: string
	): Promise<void> => {
		await this.officeInvitationValidate.checkUserCanJoinByPublicInvitation(
			userId,
			inviteCode
		);

		const office = await this.officeRepository
			.queryBuilder()
			.findByInvitationCode(inviteCode)
			.build()
			.getOne();

		const memberRole = await this.officeRoleRepository.findOfficeRoleByName(
			OfficeRoleType.MEMBER
		);

		await this.officeMemberRepository.saveOfficeMember({
			officeId: office!.id,
			memberId: userId,
			transform: {},
			roles: [{ officeRoleId: memberRole!.id }]
		});
	};

	deleteInvitation = async (inviteToken: string): Promise<void> => {};

	findAllPrivateInvitations = async (): Promise<OfficeInvitationDto[]> => {
		const invitations = await this.officeInvitationRepository.find();
		return invitations.map(ivt =>
			mapOfficeInvitationToOfficeInvitationDto(ivt)
		);
	};
}
