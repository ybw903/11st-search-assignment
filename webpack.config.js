const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'deveplopment';

module.exports ={
    mode,
    entry: path.join(__dirname,'src','index.ts'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          '@src': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
          {
            test: /\.(ts)$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          { 
            test: /\.css$/,
            use: ['style-loader', 'css-loader'] 
          },
          {
            test: /\.(jpg|png|jpeg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
            },
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist'],
        }),
    ],
    devServer: {
        hot: true,
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
    },
}
