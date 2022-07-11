const fs = require('fs');

const exportToCsv = (arr, path) => {
	let csvContent = '';

	const headers = Object.keys(arr[0]);
	csvContent += headers.join(',');
	csvContent += '\r\n';

	arr.map(o => {
		const values = Object.values(o);
		csvContent += values.join(',');
		csvContent += '\r\n';
	});

	fs.writeFileSync(path, csvContent, { encoding: 'utf-8' });
};

module.exports = { exportToCsv };
