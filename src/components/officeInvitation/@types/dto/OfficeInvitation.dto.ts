import { InviterOverviewDto } from './InviterOverview.dto';
import { OfficeOverviewDto } from './OfficeOverview.dto';

export type OfficeInvitationDto = {
	id?: number;
	office: OfficeOverviewDto;
	inviter?: InviterOverviewDto;
	invitedEmail?: string;
	token?: string;
};
