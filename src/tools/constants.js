import { unipath } from './helpers';

// ===========================================================================
// CONSTANTS
// ===========================================================================
export const THEME_NAME = 'CHANGEME';
// Root project path form localhost
export const LOCALROOT = '/';
export const PROXY_PORT = '8000';
export const PROXY_TARGET = 'localhost:' + PROXY_PORT + LOCALROOT;
export const HOST = 'localhost';
// Port should be a integer
export const PORT = '3000';
export const PATHS = {
	src: unipath('src'),
	build: unipath(''),
	modules: unipath('node_modules'),
	base: unipath('.'),
	img: unipath('src/img'),
	fonts: unipath('src/fonts')
};

export const LOADER_INCLUDES = [PATHS.src()];
export const IMG_LOADER_INCLUDES = [PATHS.img()];
export const FONT_LOADER_INCLUDES = [PATHS.fonts()];

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';
