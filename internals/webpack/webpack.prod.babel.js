/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = BundleAnalyzer.BundleAnalyzerPlugin;

const isAnalyze = process.argv && process.argv.includes('--analyze');

/* ************************************************ */
/* ************** REALLY IMPORTANT NOTE************ */
/* ************************************************ */
/*
    You can see below in "createPlugins" function that I have commented out "CommonsChunkPlugin" which doesn't work in webpack 4 (we moved from 3 to 4)
    and optimisation is handled now internaly and is configurable in "module.exports.optimisation".

    Also, "extract-text-webpack-plugin" will throw exception if used with webpack 4 (Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead)
    if we try to use current stable version of  "extract-text-webpack-plugin": "^3.0.2", and best solution is what devs say: "Since webpack v4 the
    extract-text-webpack-plugin should not be used for css. Use mini-css-extract-plugin instead."
    I decided to go against this, and installed beta version of "extract-text-webpack-plugin v4"
 */


function createPlugins() {

    // const chunk = new webpack.optimize.SplitChunks({
    // const chunk = new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     children: true,
    //     minChunks: 2,
    //     async: true
    // });

    // Minify and optimize the index.html
    const html = new HtmlWebpackPlugin({
        template: 'app/index.html',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        },
        inject: true
    });

    const analyze = new BundleAnalyzerPlugin({
        // Can be `server`, `static` or `disabled`.
        // In `server` mode analyzer will start HTTP server to show bundle report.
        // In `static` mode single HTML file with bundle report will be generated.
        // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
        analyzerMode: 'static',
        // Host that will be used in `server` mode to start HTTP server.
        analyzerHost: '127.0.0.1',
        // Port that will be used in `server` mode to start HTTP server.
        analyzerPort: 8080,
        // Path to bundle report file that will be generated in `static` mode.
        // Relative to bundles output directory.
        reportFilename: 'report.html',
        // Module sizes to show in report by default.
        // Should be one of `stat`, `parsed` or `gzip`.
        // See "Definitions" section for more information.
        defaultSizes: 'parsed',
        // Automatically open report in default browser
        openAnalyzer: true,
        // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        generateStatsFile: false,
        // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
        // Relative to bundles output directory.
        statsFilename: 'stats.json',
        // Options for `stats.toJson()` method.
        // For example you can exclude sources of your modules from stats file with `source: false` option.
        // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
        // Log level. Can be 'info', 'warn', 'error' or 'silent'.
        logLevel: 'info'
    });

    const extract = new ExtractTextPlugin({
        filename: '[name].[hash].css',
        allChunks: true
    });
    // const plugins = [chunk, html, extract];
    const plugins = [html, extract];

    return !isAnalyze ? plugins : plugins.concat(analyze);
}

module.exports = require('./webpack.base.babel')({
    // In production, we skip all hot-reloading stuff
    entry: [
        path.join(process.cwd(), 'app/app.js')
    ],

    // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },

    plugins: createPlugins(),

    performance: {
        assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename))
    }
});
