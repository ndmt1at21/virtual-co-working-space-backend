export type MessageOverviewDto = {
	id: number;
	conversationId: number;
	senderId: number;
	content?: string;
	type?: string;
	status: string;
	sentAt: Date;
};
