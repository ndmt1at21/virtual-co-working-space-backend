import { MessageOverviewDto } from './MessageOverview.dto';

export type CreatedMessageEventData = {
	message: MessageOverviewDto;
	to: number[];
};
