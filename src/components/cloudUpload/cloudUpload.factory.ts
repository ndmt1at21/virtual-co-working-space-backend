import { cloudLogger } from '../logger';
import { CloudUploadController } from './cloudUpload.controller';
import { CloudUploadMiddleware } from './cloudUpload.middleware';
import { CloudUploadService } from './cloudUpload.service';

export function createCloudUploadController() {
	const uploadService = createCloudUploadService();
	return CloudUploadController(uploadService);
}

export function createCloudUploadMiddleware() {
	return CloudUploadMiddleware();
}

export function createCloudUploadService() {
	return CloudUploadService(cloudLogger);
}
