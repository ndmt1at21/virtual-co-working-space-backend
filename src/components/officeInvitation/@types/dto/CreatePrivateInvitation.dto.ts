import { Expose } from 'class-transformer';
import { IsDefined, IsEmail } from 'class-validator';

export class CreatePrivateInvitationDto {
	inviterId: number;

	@IsDefined()
	@IsEmail({ message: 'Invited email is not valid' })
	@Expose()
	email: string;

	@IsDefined({ message: 'Office id must be specified' })
	@Expose()
	officeId: number;
}
