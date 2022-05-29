export interface IConversationValidate {
	checkConversationExists(conversationId: number): Promise<void>;

	checkUserExistsInConversation(
		conversationId: number,
		userId: number
	): Promise<void>;
}
