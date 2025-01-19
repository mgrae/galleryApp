const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx', 'css', 'module.css'],

    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_PEXEL_API_KEY': JSON.stringify(process.env.REACT_APP_PEXEL_API_KEY),
            'process.env.REACT_APP_PEXEL_BASE_URL': JSON.stringify(process.env.REACT_APP_PEXEL_BASE_URL),
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        historyApiFallback: true,
        hot: true,
    },

};