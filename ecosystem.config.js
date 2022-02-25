module.exports = {
	apps: [
		{
			name: 'virtual-working-space',
			script: 'node build/server.js',
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
