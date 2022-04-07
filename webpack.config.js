const path = require('path');
const webpack = require('webpack');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	/** @type {import('webpack').Configuration} */
	entry: './src/server.ts',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(__dirname, '.build'),
		filename: '[name].js',
		sourceMapFilename: '[file].map'
	},
	module: {
		rules: [
			{
				test: /\.(ts)$/,
				use: ['ts-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				type: 'asset/resource',
				generator: {
					filename: 'public/[name].[hash].[ext]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@constant': path.resolve(__dirname, 'src/constant')
		},
		fallback: {
			fs: false,
			http: false,
			crypto: false,
			path: false,
			util: false
		}
	},
	plugins: [
		new DotenvWebpackPlugin(),
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin()
	]
};
