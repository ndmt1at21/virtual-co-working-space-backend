module.exports = {
	apps: [
		{
			name: 'virtual-working-space',
			script: 'ts-node -r tsconfig-paths/register src/server.ts',
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
