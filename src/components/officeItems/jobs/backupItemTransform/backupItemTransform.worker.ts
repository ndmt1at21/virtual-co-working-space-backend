import { ILogger } from '@src/components/logger/@types/ILogger';
import { Queue } from 'bull';
import { OfficeItemOverviewDto } from '../../@types/dto/OfficeItemOverviewDto';
import { OfficeItemRepository } from '../../officeItem.repository';

export const loadItemPositionWorker = (
	queue: Queue,
	officeItemRepository: OfficeItemRepository,
	logger: ILogger
) => {
	queue.process(10, async job => {
		logger.info('Job update item position is started. Job id: ' + job.id);
		const { id, transform } = job.data as OfficeItemOverviewDto;
		await officeItemRepository.updateOfficeItemTransformById(id, transform);
		logger.info('Job update item position is finished. Job id: ' + job.id);
	});
};
