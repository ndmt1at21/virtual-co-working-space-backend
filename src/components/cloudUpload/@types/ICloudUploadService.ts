import { FileUploadDto } from './FileUpload.dto';

export interface ICloudUploadService {
	initialize(): Promise<void>;

	uploadMedia(file: FileUploadDto): Promise<string>;

	uploadLargeFile(fileType: FileUploadDto): Promise<string>;
}
