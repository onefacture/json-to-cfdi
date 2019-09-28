'use strict';

const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    target: 'node', // <-- Important
    externals: [nodeExternals()], // <-- Important
    output: {
        filename: 'index.js', // <-- Important
        libraryTarget: 'commonjs2'
    },
    mode: 'production',
    node : {
        __filename: false,
        __dirname: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/templates', to: 'templates' },
        ]),
    ],
};
