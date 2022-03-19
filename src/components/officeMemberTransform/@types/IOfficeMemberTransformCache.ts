import { OfficeMemberTransformDto } from './dto/OfficeMemberTransform.dto';

export interface IOfficeMemberTransformCache {
	setTransform(
		id: string,
		memberTransform: OfficeMemberTransformDto
	): Promise<void>;

	getTransformById(id: string): Promise<OfficeMemberTransformDto | undefined>;

	deleteTransformById(id: string): Promise<void>;

	scan(
		cursor: number,
		chunk: number
	): Promise<{ cursor: number; keys: string[] }>;

	flushAll(): Promise<string>;
}
