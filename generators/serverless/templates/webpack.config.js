const path = require('path');
const slsw = require('serverless-webpack');
const nodeExterals = require('webpack-node-externals');

module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    target: 'node',
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ],
    },
    externals: [
        nodeExterals({
            whitelist: /^(?!some-excluded-module|some-other-excluded-module|aws-sdk).*$/,
        })
    ],
    optimization: {
        minimize: false
    }
};
