/* eslint default-case:0 */
global.watch = true;

import * as CONFIG from './constants';
import { checkPort } from './helpers';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

if ( !checkPort(CONFIG.LOCALROOT, CONFIG.PORT) ) {
	console.log('Development configuration not set.');
}
else {
	const bundler = webpack(webpackConfig);

	console.log('Proxy Target: ', CONFIG.PROXY_TARGET);
	console.log('Path: ', webpackConfig.output.path);
	console.log('PublicPath: ', webpackConfig.output.publicPath);

	// ===========================================================================
	// CONFIG
	// ===========================================================================
	browserSync({
		files: [
			'./*.php',
			'./src/js/**/*.js',
			'./src/sass/**/*.scss',
			'./src/img/*.*'
		],

		proxy: {
			// proxy local WP install
			target: CONFIG.PROXY_TARGET,

			middleware: [
			// converts browsersync into a webpack-dev-server
				webpackDevMiddleware(bundler, {
					// Dev middleware can't access config, so we provide publicPath
					publicPath: webpackConfig.output.publicPath,

					// pretty colored output
					stats: { colors: true },

					// Set to false to display a list of each file that is being bundled.
					noInfo: true

				}),

				// hot update js && css
				webpackHotMiddleware(bundler)

				// historyApiFallback()
			]
		},

		// this gets annoying
		open: false
	});

}
