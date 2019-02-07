const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const sourceDir = path.join(__dirname, "./src");

module.exports = (env, argv) => ({
    entry: {
        "script": path.join(sourceDir, "index.js"),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath allows you to specify the base path for all the assets within your application.
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devtool: argv.mode === 'development' ? "eval-source-map" : "",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: path.join(sourceDir, "index.html"),
            filename: "index.html",
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                useShortDoctype: true
            },
            favicon: path.resolve(__dirname, "public/favicon.ico")
        }),
    ],
    devServer: {
        contentBase: './dist'
    }
});
