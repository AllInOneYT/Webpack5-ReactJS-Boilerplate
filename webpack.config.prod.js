const path = require("path");
const config = require("./webpack.config")
const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(config, {
    mode: "production",
    output: {
        filename: "[name].[fullhash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader", options: { sourceMap: true } },
                    {
                        loader: "postcss-loader", options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                },
            }
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css"
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
})