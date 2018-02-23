/* eslint-disable no-process-env */
/* eslint-disable no-shadow */
// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import * as CONFIG from './constants';
import { checkPort } from './helpers';
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig';

// this assures React is built in prod mode and that the Babel dev config doesn't apply.
process.env.NODE_ENV = 'production';

if ( !checkPort(CONFIG.LOCALROOT, CONFIG.PORT) ) {
	console.log('Development configuration not set.');
}
else {
	const bundler = webpack(webpackConfig);

	console.log(chalkProcessing('Generating minified bundle for production via Webpack. This will take a moment...'));

	bundler.run((error, stats) => {
		// so a fatal error occurred. Stop here.
		if (error) {
			console.log(chalkError(error));
			return 1;
		}

		const jsonStats = stats.toJson();

		if (jsonStats.hasErrors) {
			return jsonStats.errors.map((error) => console.log(chalkError(error)));
		}

		if (jsonStats.hasWarnings) {
			console.log(chalkWarning('Webpack generated the following warnings: '));
			jsonStats.warnings.map((warning) => console.log(chalkWarning(warning)));
		}

		console.log(`Webpack stats: ${stats}`);

		// if we got this far, the build succeeded.
		console.log(chalkSuccess('Your app is compiled in production mode in /dist. It\'s ready to roll!'));

		return 0;
	});
}
