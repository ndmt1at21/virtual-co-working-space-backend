import multer from 'multer';

export interface ICloudUploadMiddleware {
	avatarUpload: multer.Multer;

	imageUpload: multer.Multer;

	modelUpload: multer.Multer;

	appearanceUpload: multer.Multer;
}
