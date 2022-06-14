import { createMessageSubscriber } from '@src/components/messages/message.factory';

export const loadSubscribers = () => {
	const messageSubscriber = createMessageSubscriber();

	messageSubscriber.listen();
};
