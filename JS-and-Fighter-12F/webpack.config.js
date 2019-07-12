// Vue.js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 清除 dist 多餘檔案
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// // 每次創建一個新的index
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CCS 用的
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 用來複製
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        // js進入點
        main: './index.js',
        sample: './scss/style.scss'
    },
    // 追蹤錯誤
    devtool: 'source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist') // dirname = '/'
    },
    devServer: {
        host: '127.0.0.1',
        port: 9487,
        open: true,
        hot: true,
    },
    module: {
        rules: [{
                test: /\.pug$/,
                use: {
                    loader: 'pug-html-loader',
                    options: {
                        self: true, // 這個要加
                        pretty: true,
                    },
                },

            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // 這個會後執行
                    'css-loader' // 這個會先執行
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    // 需要用到的 loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|jpe?g|svg)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: './img',
                            outputPath: './img',
                            emitFile: true
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: false // disables Hot Reload
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
        ]
    },
    plugins: [
        // 清除 dist 資料夾沒用到的東西
        new CleanWebpackPlugin(),
        // 載入 jquery
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            Tether: 'tether'
        }),
        // 用來複製
        new CopyPlugin([
            { from: './img', to: 'img' },
        ]),
        new HtmlWebpackPlugin(),
        // 有幾個 pug 檔就要用幾個
        // new HtmlWebpackPlugin({
        //     title: 'Puzzle-index',
        //     hash: true,
        //     template: './pug/index.pug',
        //     filename: './index2.html'
        // }),
        new MiniCssExtractPlugin({
            // 指定輸出位置
            // [name] 為上方進入點設定的 "名稱"
            filename: "./[name].css"
        }),
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
};