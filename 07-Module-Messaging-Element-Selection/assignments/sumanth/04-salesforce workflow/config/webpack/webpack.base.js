const webpack = require('webpack');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

const bundlePath = process.env.NODE_ENV || 'dev';

const webpackBase = {
    entry: {
        contentscript: path.join(process.cwd(), 'src', 'contentscript', 'index.ts'),
        background: path.join(process.cwd(), 'src', 'background', 'index.ts'),
        popup: path.join(process.cwd(), 'src', 'popup', 'index.tsx')
    },
    output: {
        path: path.join(process.cwd(), 'dist', bundlePath),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.tsx',
            '.ts'
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(process.cwd(), 'config', 'extension'),
                    to: path.resolve(process.cwd(), 'dist', bundlePath)
                }
            ],
        })
    ]
}

module.exports = webpackBase;
