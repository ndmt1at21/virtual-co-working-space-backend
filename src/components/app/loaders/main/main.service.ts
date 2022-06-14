import { createCloudUploadService } from '@src/components/cloudUpload/cloudUpload.factory';
import { createMailService } from '@src/components/mail/mail.factory';
import { createPushNotificationService } from '@src/components/pushNotification/pushNotification.factory';

export const loadServices = async () => {
	await initMailService();
	await initCloudUploadService();
	await initPushNotificationService();
};

async function initMailService() {
	const mailService = createMailService();
	await mailService.initialize();
}

async function initCloudUploadService() {
	const cloudUploadService = createCloudUploadService();
	await cloudUploadService.initialize();
}

async function initPushNotificationService() {
	const pushNotificationService = createPushNotificationService();
	pushNotificationService.initialize();
}
