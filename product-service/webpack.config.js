const { resolve } = require('path');
const { lib }  = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { IgnorePlugin } = require('webpack');

module.exports = {
    mode: lib.webpack.isLocal ? 'development' : 'production',
    entry: lib.entries,
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()]
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: resolve(__dirname, 'src'),
            },
        ],
    },
    plugins: [
        new IgnorePlugin({
            resourceRegExp: /^pg-native$/,
        }),
    ],
};
