module.exports = {
	apps: [
		{
			name: 'virtual-working-space',
			script: 'node .build/main.js',
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
