const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

// See explanation.js
const CircularDependencyPlugin = require('circular-dependency-plugin');

// See explanation.js
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const base = require('./webpack.base.babel');

const plugins = [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoEmitOnErrorsPlugin(),
    new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false // show a warning when there is a circular dependency
    }),
    new ProgressBarPlugin({
        format: `build [:bar] ${chalk.green.bold(':percent')}`
    })
];

module.exports = base({
    // Add hot reloading in development
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        path.join(process.cwd(), 'app/app.js') // Start with js/app.js
    ],

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js'
    },

    // Add development plugins
    plugins,

    // Emit a source map for easier debugging
    devtool: 'eval-source-map',

    performance: {
        hints: false
    },

    devServer: {
        hot: true
    }
});
