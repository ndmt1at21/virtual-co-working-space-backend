import { createMailService } from '@src/components/mail/mail.factory';

export const loadServices = async () => {
	await initMailService();
};

async function initMailService() {
	const mailService = createMailService();
	await mailService.initialize();
}
