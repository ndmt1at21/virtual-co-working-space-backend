import { Readable } from 'stream';

export type FileUploadDto = {
	name: string;
	type: string;
	stream: Readable;
};
