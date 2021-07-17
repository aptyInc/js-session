const webpackBase = require('./webpack.base');

const config = {
    ...webpackBase,
    watch: false,
    mode: 'production'
}

module.exports = config;