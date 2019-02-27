const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const sourceDir = path.join(__dirname, "./src");

module.exports = (env, argv) => ({
    entry: [
        'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath allows you to specify the base path for all the assets within your application.
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        },
        runtimeChunk: true
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
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
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
    // devServer: {
    //     contentBase: [path.join(__dirname, "src")],
    //     hot: true,
    // }
});
