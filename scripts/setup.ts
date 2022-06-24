const spawnSync = require('child_process').spawnSync;
const readline = require('readline');
const typeorm = require('typeorm');
const fs = require('fs');

const styles = {
	// https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
	success: { open: '\u001b[32;1m', close: '\u001b[0m' },
	danger: { open: '\u001b[31;1m', close: '\u001b[0m' },
	info: { open: '\u001b[36;1m', close: '\u001b[0m' },
	subtitle: { open: '\u001b[2;1m', close: '\u001b[0m' }
};

const color = (modifier, string) => {
	return styles[modifier].open + string + styles[modifier].close;
};

const checkNodeVersion = () => {
	console.log(color('subtitle', '      Checking node version ...'));

	const error = spawnSync('node --version', { shell: true })
		.stderr.toString()
		.trim();

	if (error) {
		console.error(
			color(
				'danger',
				'🚨  node is not available on this computer. Please install node@14.19.0 or greater'
			)
		);
		throw error;
	}
};

const checkNpmVersion = () => {
	console.log(color('subtitle', '      Checking npm version ...'));

	const error = spawnSync('npx --version', { shell: true })
		.stderr.toString()
		.trim();

	if (error) {
		console.error(
			color(
				'danger',
				'🚨  npx is not available on this computer. Please install npm@5.2.0 or greater'
			)
		);
		throw error;
	}
};

const checkPostgresVersion = () => {
	console.log(color('subtitle', '      Checking postgresql version ...'));

	const error = spawnSync('psql -V', { shell: true })
		.stderr.toString()
		.trim();

	if (error) {
		console.error(
			color(
				'danger',
				'🚨  postgres is not available on this computer. Please install postgres@14.0 or greater'
			)
		);
		throw error;
	}
};

const checkRedisVersion = () => {
	console.log(color('subtitle', '      Checking redis-server version ...'));

	const error = spawnSync('redis-server --version', { shell: true })
		.stderr.toString()
		.trim();

	if (error) {
		console.error(
			color(
				'danger',
				'🚨  redis-server is not available on this computer. Please install redis-server@6.2.6 or greater'
			)
		);
		throw error;
	}
};

const checkTypeOrmVersion = () => {
	console.log(color('subtitle', '      Checking typeorm version ...'));

	const error = spawnSync('typeorm --version', { shell: true })
		.stderr.toString()
		.trim();

	if (error) {
		console.error(
			color(
				'danger',
				'🚨  typeorm is not available on this computer. Please install typeorm@0.2.41 or greater'
			)
		);
		throw error;
	}
};

const installDependencies = () => {
	console.log(
		color('subtitle', '      Running the following command: ' + 'npm i')
	);

	const result = spawnSync('npm i', { stdio: 'inherit', shell: true });

	if (result.status !== 0) {
		process.exit(result.status);
	}
};

const initDatabaseData = async ({
	dbHost,
	dbUsername,
	dbPassword,
	dbPort,
	dbName
}) => {
	console.log(
		color('subtitle', '      Start importing initial data to database ...')
	);

	const connection = await typeorm.createConnection({
		type: 'postgres',
		synchronize: true,
		host: dbHost,
		username: dbUsername,
		password: dbPassword,
		port: dbPort,
		database: dbName,
		entities: [__dirname + '/../src/components/**/*.entity.{ts,js}']
	});

	const initOfficeRoles = async () => {
		await connection
			.getRepository('office_role')
			.createQueryBuilder()
			.insert()
			.values([{ name: 'OWNER' }, { name: 'ADMIN' }, { name: 'MEMBER' }])
			.execute();
	};

	const initEntityTypes = async () => {
		await connection
			.getRepository('entity_type')
			.createQueryBuilder()
			.insert()
			.values([
				{ name: 'office', action: 'create' },
				{ name: 'office', action: 'add_member' },
				{ name: 'message', action: 'create' }
			])
			.execute();
	};

	const initAdminUsers = async () => {};

	await initOfficeRoles();
	await initEntityTypes();
	await initAdminUsers();

	console.log(
		color(
			'subtitle',
			'      Importing initial data to database successfully...'
		)
	);
};

const initDatabase = async cb => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('Database Host: ', function (dbHost) {
		rl.question('Database Username:  ', function (dbUsername) {
			rl.question('Database Password:  ', function (dbPassword) {
				rl.question('Database Port (5432):  ', function (dbPort) {
					rl.question('Database Name:  ', async function (dbName) {
						rl.close();

						console.log(
							color('subtitle', '      Start export env file ...')
						);

						fs.writeFileSync(
							'.env',
							`NODE_ENV=development\nPORT=8000\nCORS_ORIGIN=http://localhost:8000 http://localhost:3000\nDB_POSTGRES_HOST=${dbHost}\nDB_POSTGRES_USERNAME=${dbUsername}\nDB_POSTGRES_PASSWORD=${dbPassword}\nDB_POSTGRES_PORT=${dbPort}\nDB_POSTGRES_NAME=${dbName}\n\nJWT_SECRET=this_is_example_jwt_secret\nJWT_ACCESS_TOKEN_EXPIRES_TIME=300000\nREFRESH_TOKEN_EXPIRES_TIME=2592000000\nREFRESH_TOKEN_LENGTH=21\n\nACTIVE_USER_TOKEN_LENGTH=21\nRESET_PASSWORD_TOKEN_LENGTH=21\nRESET_PASSWORD_TOKEN_EXPIRES_TIME=600000\nGOOGLE_CLIENT_ID=google_client_id\nGOOGLE_CLIENT_SECRET=google_client_secret\nFACEBOOK_CLIENT_ID=facebook_client_id\nFACEBOOK_CLIENT_SECRET=facebook_client_secret\nEMAIL_SERVICE_NAME=mail_service_name\nEMAIL_SERVICE_HOST=mail_service_host\nEMAIL_SERVICE_PORT=mail_service_port\nEMAIL_SERVICE_USERNAME=mail_service_username\nEMAIL_SERVICE_PASSWORD=mail_service_password\nCLIENT_DOMAIN=http://localhost:3000\nSERVER_DOMAIN=http://localhost:8000\nIMAGE_CLOUDINARY_CLOUD_NAME=image_cloudinary_cloud_name\nIMAGE_CLOUDINARY_API_KEY=image_cloudinary_api_key\nIMAGE_CLOUDINARY_API_SECRET=image_cloudinary_api_secret\nMODEL_AWS_BUCKET_NAME=virtual-space-models\nMODEL_AWS_BUCKET_REGION=ap-southeast-1\nMODEL_AWS_BUCKET_ACCESS_KEY=model_aws_bucket_access_key\nMODEL_AWS_BUCKET_SECRET_KEY=model_aws_bucket_secret_key\nMODEL_AWS_BUCKET_CORS_ORIGINS=http://localhost:8000 http://localhost:3000 http://localhost:3001\nOFFICE_INVITE_CODE_LENGTH=6\nNOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME=5184000000\nFIREBASE_APPLICATION_CREDENTIALS=./firebase-adminSDK.json`
						);

						console.log(
							color(
								'subtitle',
								'      Start connecting to to database ...'
							)
						);

						await initDatabaseData({
							dbHost,
							dbUsername,
							dbPassword,
							dbPort: !dbPort ? 5432 : dbPort,
							dbName
						});

						cb();
					});
				});
			});
		});
	});
};

const main = async () => {
	// Step 1: check environment
	console.log(
		color(
			'info',
			'▶️  Start checking environment for running ViSpace backend...'
		)
	);

	checkNodeVersion();
	checkNpmVersion();
	checkPostgresVersion();
	checkRedisVersion();
	checkTypeOrmVersion();

	// Step 2: install dependencies
	console.log(color('info', '▶️  Start installing all dependencies...'));
	installDependencies();

	// Step 3: init database
	console.log(color('info', '▶️  Start initializing database...'));
	await initDatabase(() =>
		// Finish
		console.log(color('success', '✅  ViSpace backend setup complete...'))
	);
};

main();
