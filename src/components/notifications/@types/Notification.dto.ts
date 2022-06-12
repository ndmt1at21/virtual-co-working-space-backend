import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type NotificationDto = {
	id: number;
	entity: {
		type: string;
		action: string;
		data: any;
	};
	actor: UserOverviewDto;
	createdAt: Date;
};
