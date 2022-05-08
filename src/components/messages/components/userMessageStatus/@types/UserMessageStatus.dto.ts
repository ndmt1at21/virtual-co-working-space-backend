export type UserMessageReadStatusDto = {
	messageId: number;
	readerId: number;
	readAt: Date;
};

export type UserMessageReceivedStatusDto = {
	messageId: number;
	receiverId: number;
	receivedAt: Date;
};

export type UserMessageStatusDto = {
	messageId: number;
	userId: number;
	status: string;
	createdAt: Date;
};
