import { OfficeMemberTransformDto } from './dto/OfficeMemberTransform.dto';

export interface IOfficeMemberTransformCache {
	setTransform(
		id: number,
		memberTransform: OfficeMemberTransformDto
	): Promise<void>;

	getTransformById(id: number): Promise<OfficeMemberTransformDto | undefined>;

	deleteTransformById(id: number): Promise<void>;

	scan(
		cursor: number,
		chunk: number
	): Promise<{ cursor: number; keys: string[] }>;

	flushAll(): Promise<string>;
}
