import { officeItemLogger } from '@src/components/logger';
import { OfficeItemTransformCacheService } from '../cache/officeItemTransform/officeItemTransform.service';
import { createOfficeItemRepository } from '../officeItem.factory';
import { createBackupItemPositionQueue } from './backupItemTransform/backupItemTransform.queue';
import { loadUpdateItemTransformSchedule } from './backupItemTransform/backupItemTransform.schedule';
import { loadItemPositionWorker } from './backupItemTransform/backupItemTransform.worker';

export const loadBackgroundJobs = () => {
	const officeItemRepository = createOfficeItemRepository();
	const cacheService = OfficeItemTransformCacheService();
	const queue = createBackupItemPositionQueue();

	loadUpdateItemTransformSchedule(queue, cacheService);
	loadItemPositionWorker(queue, officeItemRepository, officeItemLogger);
};
