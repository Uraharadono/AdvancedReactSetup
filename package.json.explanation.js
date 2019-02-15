/* eslint-disable */
let Package_JSON_EXPLANATION = {
  "name": "ArticleMaster.Desktop",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "clean": "rimraf ./build",
    "lint": "eslint --ignore-path .gitignore -- . ",
    "pretest": "npm run test:clean && npm run lint",
    // "test": "cross-env NODE_ENV=test jest --coverage",
    "test:clean": "rimraf ./coverage",
    "test:watch": "cross-env NODE_ENV=test jest --watchAll",
    "coveralls": "cat ./coverage/lcov.info | coveralls",
    "build": "npm run build:clean && npm run build:base",
    "build:test": "npm run build:clean && npm run build:base -- --env.test=true",
    "build:clean": "npm run test:clean && rimraf ./build",
    "build:base": "cross-env NODE_ENV=production webpack --config internals/webpack/webpack.prod.babel.js --color -p --progress",
    "build:analyze": "cross-env NODE_ENV=production webpack --config internals/webpack/webpack.prod.babel.js --color -p --progress -- --analyze",
    "analyze": "npm run build:clean && npm run build:analyze",
    "start": "cross-env NODE_ENV=development node server",
    "start:prod": "cross-env NODE_ENV=production node server",
    "start:production": "npm run build && npm run start:prod"
  },
  "dependencies": {
    // Core React library
    "react": "^16.7.0",
    // Web part of React library
    "react-dom": "^16.7.0"
  },
  "devDependencies": {
    // ES lint rules - we all know this
    "eslint": "^5.12.1",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-import-resolver-webpack": "^0.11.0",
    "eslint-plugin-jsx-a11y": "^6.1.2",
    "eslint-plugin-react": "^7.12.4",

    // Webpack obvious, but CLI is required since v4 and allows for usage of file configuration instead of "Command Line Interface" approach
    "webpack": "^4.28.4",
    "webpack-cli": "^3.2.1",


    /* ======================================================== */
    /* =================  BUILD TOOLS  ======================== */
    /* ======================================================== */

    // Run scripts that set and use environment variables across platforms
    // https://www.npmjs.com/package/cross-env
    "cross-env": "^5.2.0",

    // Used in build sequence to clean "build" folder (remove, recursive, force removal: "rm -rf" command)
    // https://github.com/isaacs/rimraf
    "rimraf": "^2.6.3",

    /* ======================================================== */
    /* ==================  SERVER FOLDER  ===================== */
    /* ======================================================== */

    // Fast, unopinionated, minimalist web framework for node.
    // https://www.npmjs.com/package/express
    "express": "^4.16.4",

    // IP address utilities for node.js
    // https://www.npmjs.com/package/ip
    "ip": "^1.1.5",

    // Colors for console
    // Terminal string styling done right
    // https://www.npmjs.com/package/chalk
    "chalk": "^2.4.2",

    // parse argument options
    // This module is the guts of optimist's argument parser without all the fanciful decoration.
    // https://github.com/substack/minimist
    "minimist": "^1.2.0",

    // ngrok  - creates http-https-tcp tunnels
    // https://www.npmjs.com/package/ngrok
    "ngrok": "^3.1.0",

    // Node.js compression middleware
    // https://github.com/expressjs/compression
    "compression": "^1.7.3",

    // Visualize size of webpack output files with an interactive zoomable treemap.
    // https://www.npmjs.com/package/webpack-bundle-analyzer
    "webpack-bundle-analyzer": "^3.0.3",

    // An express-style development middleware for use with webpack bundles and allows for serving of the files emitted from webpack. This should be used for development only.
    // https://github.com/webpack/webpack-dev-middleware
    "webpack-dev-middleware": "^3.5.1",

    // This allows you to add hot reloading into an existing server without webpack-dev-server.
    // https://github.com/webpack-contrib/webpack-hot-middleware
    "webpack-hot-middleware": "^2.24.3",

    // -- somwhere here starts dev dep --
    // Detect modules with circular dependencies when bundling with webpack.
    // https://github.com/aackerman/circular-dependency-plugin
    "circular-dependency-plugin": "^5.0.2",

    // Progress bar for webpack
    // https://www.npmjs.com/package/progress-bar-webpack-plugin
    "progress-bar-webpack-plugin": "^1.12.1",

    // *
    // Babel transpiler - AND ALL OF THE SHIT IT NEEDS TO WORK PROPERLY
    // Note: "@" sign in front of some babel libraries is because of newer stuff requires it
    // NOTE NOTE NOTE: AS OF BABEL 7 ALL OF PACKAGES MUST BE with "@" sign, so PLEASE WHEN CONFIGURING BABEL
    // MAKE SURE THAT YOU USE "@" signs. So there was "
    // "presets": [["env""
    // and now it should be
    // "presets": [["@babel/preset-env""
    // as seen explained here: https://github.com/babel/babel/issues/6808#issuecomment-343792786

    // https://babeljs.io/docs/en/next/babel-core.html
    "@babel/core": "^7.2.2",
    // https://github.com/babel/babel-loader
    "babel-loader": "^8.0.5",
    // A Babel preset that compiles ES2015 down to ES5 by automatically determining the Babel plugins and polyfills you need based on your targeted browser or runtime environments.
    // https://github.com/babel/babel/tree/master/packages/babel-preset-env
    "@babel/preset-env": "^7.3.1",
    // Babel-eslint allows you to lint ALL valid Babel code with the fantastic ESLint.
    // https://github.com/babel/babel-eslint
    "babel-eslint": "^10.0.1",
    // Usage of react sytax
    // https://babeljs.io/docs/en/babel-preset-react
    "babel-preset-react": "^6.24.1",
    // Remove unnecessary React propTypes from the production build.
    // https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
    "babel-plugin-transform-react-remove-prop-types": "^0.4.24",
    // Treat React JSX elements as value types and hoist them to the highest scope
    // https://www.npmjs.com/package/babel-plugin-transform-react-constant-elements
    "babel-plugin-transform-react-constant-elements": "^6.23.0",
    // As of Babel v7, all the stage presets have been deprecated
    // https://babeljs.io/docs/en/babel-preset-stage-0
    // https://babeljs.io/docs/en/babel-preset-stage-0
    // NOTE NOTE NOTE: As of Babel v7, all the stage presets have been deprecated
    // This means that if you want to use them, you must specify them in plugins all one by one as I did
    // If you are lazy to create your own install here it is:
    /*
          npm install --save-dev @babel/plugin-proposal-function-bind
          npm install --save-dev @babel/plugin-proposal-export-default-from
          npm install --save-dev @babel/plugin-proposal-logical-assignment-operators
          npm install --save-dev @babel/plugin-proposal-optional-chaining
          npm install --save-dev @babel/plugin-proposal-pipeline-operator
          npm install --save-dev @babel/plugin-proposal-nullish-coalescing-operator
          npm install --save-dev @babel/plugin-proposal-do-expressions
          npm install --save-dev @babel/plugin-proposal-decorators
          npm install --save-dev @babel/plugin-proposal-function-sent
          npm install --save-dev @babel/plugin-proposal-export-namespace-from
          npm install --save-dev @babel/plugin-proposal-numeric-separator
          npm install --save-dev @babel/plugin-proposal-throw-expressions
          npm install --save-dev @babel/plugin-syntax-dynamic-import
          npm install --save-dev @babel/plugin-syntax-import-meta
          npm install --save-dev @babel/plugin-proposal-class-properties
          npm install --save-dev @babel/plugin-proposal-json-strings"
    */

    "babel-preset-stage-0": "^6.24.1",
    // When used alongside @babel/plugin-transform-runtime, polyfills (by default including Symbol) are specifically scoped to not pollute the global scope. This breaks usage with React, as it won't have access to that polyfill and will cause your application to fail in legacy browsers.
    // https://babeljs.io/docs/en/babel-plugin-transform-react-inline-elements
    "babel-plugin-transform-react-inline-elements": "^6.22.0",
    // This plugin transforms ES2015 modules to CommonJS.
    // https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-commonjs
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
    // Babel plugin to transpile import() to a deferred require(), for node
    // https://github.com/airbnb/babel-plugin-dynamic-import-node
    "babel-plugin-dynamic-import-node": "^2.2.0",



    // A loader for webpack which transforms files into base64 URIs.
    // https://github.com/webpack-contrib/url-loader
    "url-loader": "^1.1.2",

    // The file-loader resolves import/require() on a file into a url and emits the file into the output directory.
    // https://github.com/webpack-contrib/file-loader
    "file-loader": "^3.0.1",

    // Tweak React components in real time ⚛️⚡️
    // https://github.com/gaearon/react-hot-loader
    "react-hot-loader": "^4.6.5",



    /* ======================================================== */
    /* ==================  CSS TOOLS  ========================= */
    /* ======================================================== */

    // Compiles Sass to CSS
    // https://github.com/webpack-contrib/sass-loader
    "sass-loader": "^7.1.0",
    // Needed by "sass-loader"
    "node-sass": "^4.11.0",

    // The css-loader interprets @import and url() like import/require() and will resolve them.
    // https://github.com/webpack-contrib/css-loader
    "css-loader": "^2.1.0",

    // Adds CSS to the DOM by injecting a <style> tag
    // https://github.com/webpack-contrib/style-loader
    "style-loader": "^0.23.1",

    // PostCSS is a tool for transforming styles with JS plugins.
    // These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.
    // https://github.com/postcss/postcss
    "postcss-loader": "^3.0.0",

    // PostCSS plugin This project tries to fix all of flexbug's issues.
    // https://github.com/luisrudge/postcss-flexbugs-fixes
    "postcss-flexbugs-fixes": "^4.1.0",

    // PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
    // It is recommended by Google and used in Twitter and Alibaba.
    // https://www.npmjs.com/package/autoprefixer
    "autoprefixer": "^9.4.6",

    // cssnano: A modular minifier based on the PostCSS ecosystem.
    // cssnano takes your nicely formatted CSS and runs it through many focused optimisations, to ensure that the final result is as small as possible for a production environment.
    // https://cssnano.co/
    "cssnano": "^4.1.8",

    // Extract text from a bundle, or bundles, into a separate file.
    // https://github.com/webpack-contrib/extract-text-webpack-plugin
    "extract-text-webpack-plugin": "^3.0.2",



    /* ======================================================== */
    /* ==================  HTML TOOLS  ======================== */
    /* ======================================================== */

    // Plugin that simplifies creation of HTML files to serve your bundles
    "html-webpack-plugin": "^3.2.0",


    /* ======================================================== */
    /* ================ UTIL FOLDER LIBRARIES  ================ */
    /* ======================================================== */

    // Promise based HTTP client for the browser and node.js (Xhr in javascript, Ajax in Jquery)
    // https://github.com/axios/axios
    "axios": "^0.18.0",

    // A querystring parsing and stringifying library with some added security.
    // https://www.npmjs.com/package/qs
    // https://github.com/ljharb/qs
    "qs": "^6.6.0",

    // Modern JavaScript date utility library
    // https://date-fns.org/
    "date-fns": "^1.30.1",

    // Parse, validate, manipulate, and display dates and times in JavaScript.
    // https://momentjs.com/
    "moment": "^2.24.0",


  }
}
