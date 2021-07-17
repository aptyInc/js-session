const CopyPlugin = require('copy-webpack-plugin');
const webpackBase = require('./webpack.base');


const config = {
    ...webpackBase,
    devtool: 'inline-source-map',
    watch: true,
    mode: 'development'
}

module.exports = config;