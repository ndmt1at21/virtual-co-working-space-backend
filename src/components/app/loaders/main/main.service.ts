import { createCloudUploadService } from '@src/components/cloudUpload/cloudUpload.factory';
import { createMailService } from '@src/components/mail/mail.factory';

export const loadServices = async () => {
	await initMailService();
	await initCloudUploadService();
};

async function initMailService() {
	const mailService = createMailService();
	await mailService.initialize();
}

async function initCloudUploadService() {
	const cloudUploadService = createCloudUploadService();
	await cloudUploadService.initialize();
}
