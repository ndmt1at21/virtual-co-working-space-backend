import {
	CreateOfficeInvitationByEmailDto,
	CreatePublicOfficeInvitationDto
} from './@types/dto/CreateOfficeInvitation.dto';
import { OfficeInvitationDto } from './@types/dto/OfficeInvitation.dto';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';
import { IOfficeInvitationValidate } from './@types/IOfficeInvitationValidate';
import { mapOfficeInvitationToOfficeInvitationDto } from './officeInvitation.mapping';
import { OfficeInvitationRepository } from './officeInvitation.repository';

export const OfficeInvitationService = (
	officeInvitationRepository: OfficeInvitationRepository,
	officeInvitationValidate: IOfficeInvitationValidate
): IOfficeInvitationService => {
	const createPublicOfficeInvitation = async (
		invitationDto: CreatePublicOfficeInvitationDto
	): Promise<OfficeInvitationDto> => {
		await officeInvitationValidate.checkCreatePublicInvitationTokenData(
			invitationDto
		);

		const { inviterId, officeId } = invitationDto;

		const officeInvitation = await officeInvitationRepository.create({
			officeId,
			createdByUserId: inviterId
		});

		return mapOfficeInvitationToOfficeInvitationDto(officeInvitation);
	};

	const createOfficeInvitationByEmail = async (
		invitationDto: CreateOfficeInvitationByEmailDto
	): Promise<OfficeInvitationDto> => {
		await officeInvitationValidate.checkCreateInvitationTokenByEmailData(
			invitationDto
		);

		const { invitedEmail, inviterId, officeId } = invitationDto;

		const officeInvitation = await officeInvitationRepository.create({
			officeId,
			createdByUserId: inviterId,
			invitedEmail: invitedEmail
		});

		return mapOfficeInvitationToOfficeInvitationDto(officeInvitation);
	};

	const findInvitationByInvitedEmailAndInvitationToken = async (
		invitedEmail: string,
		token: string
	): Promise<OfficeInvitationDto> => {
		await officeInvitationRepository.existsOfficeInvitationToken(token);
		const officeInvitation =
			await officeInvitationRepository.findOfficeInvitationByInvitedEmailAndInvitationToken(
				invitedEmail,
				token
			);

		return mapOfficeInvitationToOfficeInvitationDto(officeInvitation!);
	};

	const acceptInvitationByInvitationToken = async (inviteToken: string) => {};

	const deleteInvitation = async (inviteToken: string) => {};

	return {
		createPublicOfficeInvitation,
		createOfficeInvitationByEmail,
		acceptInvitationByInvitationToken,
		deleteInvitation
	};
};
