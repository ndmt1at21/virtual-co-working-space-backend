import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type MessageReaderDto = {
	reader: UserOverviewDto;
	readAt: Date;
};
