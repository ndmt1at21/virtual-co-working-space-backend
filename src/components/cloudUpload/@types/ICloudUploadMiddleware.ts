import multer from 'multer';

export interface ICloudUploadMiddleware {
	avatarUpload: multer.Multer;

	imageUpload: multer.Multer;

	modelUpload: multer.Multer;

	accessoryUpload: multer.Multer;
}
