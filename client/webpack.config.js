const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    return {
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            open: true,
            port: 35432,
            proxy: {
                '/upload': 'http://localhost:3000'
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                inject: false
            })
        ],
        resolve: {
            extensions: [ '.js' ],
        }
    }
};
