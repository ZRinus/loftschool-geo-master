const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './lib/bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/templates/index.hbs',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin('dist')
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader'
            }
        ]
        
    },

    devServer: {
        contentBase: path.resolve(__dirname, './src')
    }
};