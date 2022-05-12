import { cloudLogger } from '../logger';
import { CloudUploadController } from './cloudUpload.controller';
import { CloudUploadMiddleware } from './cloudUpload.middleware';
import { CloudUploadService } from './cloudUpload.service';

export function createCloudUploadController() {
	const uploadService = createCloudUploadService();
	return new CloudUploadController(uploadService, cloudLogger);
}

export function createCloudUploadMiddleware() {
	return new CloudUploadMiddleware();
}

export function createCloudUploadService() {
	return new CloudUploadService(cloudLogger);
}
