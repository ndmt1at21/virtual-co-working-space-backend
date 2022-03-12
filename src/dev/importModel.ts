import modelsData from './model.json';
import { connectDatabase } from '../components/app/loaders/database';
import { createItemRepository } from '../components/items/item.factory';
import { CreateItemDto } from '../components/items/@types/dto/createItem.dto';

connectDatabase()
	.then(_ => {
		const itemRepository = createItemRepository();

		const importData = async () => {
			const allItems = modelsData as CreateItemDto[];

			itemRepository
				.createQueryBuilder()
				.insert()
				.values(allItems)
				.execute()
				.then(_ => console.log('insert items successfully'))
				.catch(err => console.log(err));
		};

		const deleteData = async () => {
			await itemRepository.createQueryBuilder();
			await itemRepository.createQueryBuilder().delete().execute();
		};

		if (process.argv[2] === '--import') {
			importData();
		} else if (process.argv[2] === '--delete') {
			deleteData();
		}
	})
	.catch(err => console.log(err));
