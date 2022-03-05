import { connectDatabase } from '@src/components/app/loaders/database';

connectDatabase().then(_ => {
	const importData = async () => {};

	const deleteData = async () => {};

	if (process.argv[2] === '--import') {
		importData();
	} else if (process.argv[2] === '--delete') {
		deleteData();
	}
});
