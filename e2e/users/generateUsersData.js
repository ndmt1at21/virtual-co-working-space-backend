const RandExp = require('randexp');
const { faker } = require('@faker-js/faker');
const { exportToCsv } = require('../utils');

const emailDict = {};

const uniqueEmail = () => {
	for (let i = 0; i < 100000; i++) {
		const email = faker.internet.email();
		if (!emailDict[email]) return email;
	}

	return null;
};

const users = new Array(100000).fill({}).map(_ => {
	const password = new RandExp(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{25}$/
	).gen();

	const user = {
		email: uniqueEmail(),
		name: faker.name.findName(),
		password,
		passwordConfirm: password
	};

	return user;
});

const exportUsersToCsv = (users, path) => {
	exportToCsv(users, path);
};

exportUsersToCsv(users, 'src/e2e/data/users/userData.csv');
