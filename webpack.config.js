const webpack = require('webpack');
const path = require('path');
const exec = require('child_process').exec;
exec('rm -rf dist');

module.exports = {
    entry: {
        index: './src/mvvm.js',
    },
    resolve: {
        alias: {
        },
        modules: [path.join(__dirname, 'src'), 'node_modules'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'mvvm.js',
    },
    module: {
        rules: [
            { test: /\.js|jsx$/, loader: 'babel-loader', include: [path.join(__dirname, 'src')] },
            { test: /\.json$/, use: 'json-loader' },
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    watch: true,
};