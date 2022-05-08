import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type MessageReactionDto = {
	userId: number;
	reaction: string;
	reactAt: Date;
};
