import { Expose } from 'class-transformer';
import { IsDefined, IsEmail, IsNumber } from 'class-validator';

export class CreatePublicOfficeInvitationDto {
	@IsDefined()
	@Expose()
	inviterId: number;

	@IsDefined()
	@Expose()
	officeId: number;
}

export class CreateOfficeInvitationByEmailDto {
	@IsDefined()
	@Expose()
	inviterId: number;

	@IsDefined()
	@Expose()
	officeId: number;

	@IsDefined()
	@IsEmail()
	@Expose()
	invitedEmail: string;
}

export type CreateOfficeInvitationDto = {
	inviterId: number;
	officeId: number;
	invitedEmail?: string;
};
