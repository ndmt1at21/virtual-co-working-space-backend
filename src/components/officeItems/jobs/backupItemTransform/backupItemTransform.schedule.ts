import { Queue } from 'bull';
import { IOfficeItemTransformCache } from '../../cache/@types/IOfficeItemTransformCache';
import { OfficeItemTransform } from '../../cache/@types/ItemTransform';

export const loadUpdateItemTransformSchedule = async (
	queue: Queue,
	positionItemCache: IOfficeItemTransformCache
) => {
	queue.add(
		'backup_update_item_transform',
		await getAndFlushAllTransforms(500)
	);

	async function getAndFlushAllTransforms(
		chunk: number
	): Promise<OfficeItemTransform[][]> {
		const allTransforms: OfficeItemTransform[][] = [];

		let chunkTransforms: OfficeItemTransform[] = [];

		while (true) {
			const { cursor, keys } = await positionItemCache.scan(chunk, chunk);

			if (cursor === 0) break;

			keys.forEach(async key => {
				const val = await positionItemCache.getTransformById(key);
				chunkTransforms.push({ id: key, transform: val! });
			});

			allTransforms.push(chunkTransforms);
			chunkTransforms = [];
		}

		return allTransforms;
	}
};
