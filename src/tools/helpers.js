import path from 'path';

// ===========================================================================
// UTILS
// ===========================================================================

export function unipath(base) {
	// Args:  ( ...paths )
	return function join() {
		// eslint-disable-next-line prefer-rest-params
		const _paths = [base].concat(Array.from(arguments));
		return path.resolve(path.join.apply(null, _paths));
	};
}

export function checkPort(root, port) {

	if ( root === 'CHANGEME' || port === 'CHANGEME' ) {
		return false;
	}

	return true;

}
