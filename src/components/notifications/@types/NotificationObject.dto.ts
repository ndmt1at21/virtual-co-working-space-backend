import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type NotificationObjectDto = {
	id: number;
	entity: {
		type: string;
		action: string;
		data: any;
	};
	actor: UserOverviewDto;
	notifierIds: number[];
	createdAt: Date;
};
