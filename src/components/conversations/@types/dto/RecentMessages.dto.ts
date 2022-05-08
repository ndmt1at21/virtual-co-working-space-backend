import { MessageDto } from '@src/components/messages/@types/dto/MessageDto';
import { RecentMessagePaginationInfo } from '@src/components/messages/@types/RecentMessagePaginate';

export type RecentMessagesDto = {
	messages: MessageDto[];
	pagination: RecentMessagePaginationInfo;
};
