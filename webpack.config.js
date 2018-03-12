const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            // 用正则去匹配要用该 loader 转换的 CSS 文件
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:['css-loader?minimize&?sourceMap','postcss-loader?sourceMap' ]
            }),
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:['css-loader?minimize&?sourceMap', 'postcss-loader?sourceMap' ,'sass-loader?sourceMap']
            }),
          },
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: [/node_modules/]
          },
          {
              test:/\.(png)|(jpg)|(jpeg)|(gif)$/,
              use: ['url-loader?limit=8192&name=img/[name].[ext]']
          }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(
            ['dist/*',],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new ExtractTextPlugin({
            filename:`main.css`,
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //   sourceMap: true,
        //   compress: {
        //     warnings: false
        //   }
        // })
    ],
    devtool: 'source-map',
};