export type UserMessageReadStatusDto = {
	id: number;
	messageId: number;
	readerId: number;
	readAt: Date;
};

export type UserMessageReceivedStatusDto = {
	id: number;
	messageId: number;
	receiverId: number;
	receivedAt: Date;
};

export type UserMessageStatusDto = {
	id: number;
	messageId: number;
	userId: number;
	status: string;
	createdAt: Date;
};
