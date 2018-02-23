# Webpack Starter Kit
## Using WordPress and Docker

This is intended to provide a basic started kit for using Webpack and Docker to build a WordPress site. Docker, Node, and a package manager must be install for all files to function correctly.

## Important Announcements

<b>Remember to edit the package.json and ./tools/constants.js files to meet your project needs.</b> This is a user guide and starter kit, it is not ready to go 'out-of-the-box'.

The config files should all be download and used within your projects root folder.

## Notes on WordPress

This kit is built with the use of [Underscores.me](http://underscores.me/) as the preferred WordPress theme. However, it can be dropped into any theme required, but the default file paths adhere to Underscores' coding practices.

## JavaScript

This kit uses [Babel](https://babeljs.io/) to compile all fancy ES2015/6/7 syntax into more browser friendly JavaScript. See the *eslintrc.js* file for additional specifics.

Unit testing is run by Mocha and requires at least one spec file be present.

## CSS and SASS

As with our scripting, this kit uses a *stylelintrc.js*.

## Linters and Common Configurations

This kit uses the following linters and configuration files,

- <b>*.editorconfig*</b>: Standardizes certain text editor settings across the development team such as spaces, tabs, and indentations
- <b>*.npmrc*</b>: Sets a few global NPM settings
- <b>*.babelrc*</b>: Sets the global Babel settings on a per project basis
- <b>*.eslintrc.js*</b>: Sets the JavaScript coding standards
- <b>*.eslintignore*</b>: Sets a few global file ignores on a per project basis
- <b>*.stylelintrc.js*</b>: Sets the CSS/SASS coding standards

## Automation and Tools

Below you will find a list of required tools to run this Kit

- [Dockers](https://www.docker.com/): Runs the development container
- [Node.js](https://nodejs.org/en/): Runs the build tool eco-system
- [NPM](https://www.npmjs.com/): Sticking with the OG package manager for now, but works with yarn and pnpm as well.
- [Webpack](https://webpack.github.io): Module bundler for JS and CSS

## Install

Download the *zip* file and configure the *package.json* to fit your needs.
Navigate to your local projects root directory.
With [npm](https://npmjs.org/) installed, run

```
$ npm install
```

To start working run,
```
$ npm start
```

To compile a finished product run,
```
$ npm run build
```

## Acknowledgments

- WordPress Inspiration - [Underscores.me](http://underscores.me/)
- Webpack Inspiration - config and tool files inspired by Cory House's [React Slingshot](https://github.com/coryhouse/react-slingshot)

## License

GNU GENERAL PUBLIC LICENSE
