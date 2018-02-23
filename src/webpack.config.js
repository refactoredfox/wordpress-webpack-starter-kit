/* eslint default-case:0 */
/* eslint-disable no-process-env */
import webpack from 'webpack';
import { dependencies } from '../package.json';
import * as CONFIG from './tools/constants';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';
// Bundler Analyzer disabled by default
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// ===========================================================================
// SETUP ENV
// ===========================================================================
const TARGET = process.env.npm_lifecycle_event;
const ENV = getEnv(TARGET);
const WATCH = global.watch || false;

// ===========================================================================
// CONFIG EXPORT
// ===========================================================================
export default {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	entry: getEntry(ENV),

	output: {
		path: CONFIG.PATHS.build(),
		publicPath: ENV === CONFIG.PRODUCTION ? '' : `http://${CONFIG.HOST}:${CONFIG.PORT}/wp-content/themes/${CONFIG.THEME_NAME}/`,
		filename: 'js/[name].js',
		sourceMapFilename: '[file].map'
	},

	module: {
		rules: getLoaders(ENV)
	},

	devtool: ENV === CONFIG.PRODUCTION ? 'source-map' : 'inline-source-map',

	plugins: getPlugins(ENV),

	externals: {
		jquery: 'window.jQuery'
	},

	target: 'web',

	watch: WATCH
};


// ===========================================================================
// CONFIG ENV DEFINITIONS
// ===========================================================================
function getEntry(env) {
	const entry = {};
	entry.main = [];
	entry.vendor = Object.keys(dependencies);

	switch (env) {
		case CONFIG.DEVELOPMENT:
			entry.main = [CONFIG.PATHS.src('js', 'main.js')];
			// Used for Hot Re-Loading - Currently not working but feel free to try
			// entry.main.unshift('webpack/hot/only-dev-server');
			// entry.main.unshift(`webpack-hot-middleware/client?http://${CONFIG.HOST}:${CONFIG.PORT}/SITE/wordpress-dev`);
			entry.main.push(CONFIG.PATHS.src('sass', 'style.scss'));
			break;

		case CONFIG.PRODUCTION:
			entry.main = [CONFIG.PATHS.src('js', 'main.js')];
			entry.main.push(CONFIG.PATHS.src('sass', 'style.scss'));
			break;
	}

	return entry;
}

function getLoaders(env) {
	const JS_LOADER = {
		test: /\.js$/,
		include: CONFIG.LOADER_INCLUDES,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader'
		}
	};

	const EOT_LOADER = {
		test: /\.eot(\?v=\d+.\d+.\d+)?$/,
		include: CONFIG.FONT_LOADER_INCLUDES,
		use: {
			loader: 'file-loader',
			options: {
				name: 'fonts/[name].[ext]'
			}
		}
	};

	const SVG_LOADER = {
		test: /\.svg(\?v=\d+.\d+.\d+)?$/,
		include: CONFIG.FONT_LOADER_INCLUDES,
		use: {
			loader: 'file-loader',
			options: {
				name: 'fonts/[name].[ext]'
			}
		}
	};

	const WOFF_LOADER = {
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		include: CONFIG.FONT_LOADER_INCLUDES,
		use: {
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'application/font-woff',
				name: 'fonts/[name].[ext]'
			}
		}
	};

	const TTF_LOADER = {
		test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
		include: CONFIG.FONT_LOADER_INCLUDES,
		use: {
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'application/octet-stream',
				name: 'fonts/[name].[ext]'
			}
		}
	};

	const IMG_LOADER = {
		test: /\.(jpe?g|png|gif|svg)$/i,
		include: CONFIG.IMG_LOADER_INCLUDES,
		use: {
			loader: 'file-loader',
			options: {
				name: 'img/[path][name].[ext]',
				context: path.join(__dirname, '/img')
			}
		}
	};

	const IMG_OPT_LOADER = {
		test: /\.(jpe?g|png|gif|svg)$/i,
		include: CONFIG.IMG_LOADER_INCLUDES,
		use: [{
			loader: 'file-loader',
			options: {
				name: 'img/[path][name].[ext]',
				context: path.join(__dirname, '/img')
			}
		}, {
			loader: 'image-webpack-loader',
			query: {
				bypassOnDebug: true,
				mozjpeg: {
					progressive: true
				},
				gifsicle: {
					interlaced: false
				},
				optipng: {
					optimizationLevel: 4
				},
				pngquant: {
					quality: '75-90',
					speed: 3
				}
			}
		}]
	};

	const loaders = [
		JS_LOADER,
		EOT_LOADER,
		SVG_LOADER,
		WOFF_LOADER,
		TTF_LOADER
	];

	switch (env) {
		case CONFIG.PRODUCTION:
			loaders.push(IMG_OPT_LOADER);
			loaders.push({
				test: /\.s?css$/,
				include: CONFIG.LOADER_INCLUDES,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							minimize: true
						}
					}, {
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer]
						}
					}, {
						loader: 'sass-loader'
					}]
				})
			});
			break;

		case CONFIG.DEVELOPMENT:
			loaders.push(IMG_LOADER);
			loaders.push({
				test: /\.s?css$/,
				include: CONFIG.LOADER_INCLUDES,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							minimize: false
						}
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							minimize: false
						}
					}]
				})
			});
			break;
	}

	return loaders;
}

function getPlugins(env) {
	const plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(env)
			}
		})
	];

	switch (env) {

		case CONFIG.PRODUCTION:
			plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
			plugins.push(new webpack.optimize.UglifyJsPlugin({
				compress: { warnings: false },
				sourceMap: true
			}));
			break;

		case CONFIG.DEVELOPMENT:
			// plugins.push(new webpack.HotModuleReplacementPlugin());
			plugins.push(new webpack.NoEmitOnErrorsPlugin());
			break;
	}

	plugins.push(new ExtractTextPlugin({
		filename: 'style.css'
	}));

	// plugins.push(new BundleAnalyzerPlugin());

	return plugins;
}

// ===========================================================================
// UTILS
// ===========================================================================
function getEnv(target) {
	switch (target) {
		case 'start':
			return CONFIG.DEVELOPMENT;

		case 'build':
			return CONFIG.PRODUCTION;

		default:
			return CONFIG.DEVELOPMENT;
	}
}
