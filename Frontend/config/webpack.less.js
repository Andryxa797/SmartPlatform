const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    return {
        entry: {
            app: path.resolve(__dirname, "./../src/less/app.less"),
        },
        output: {
            path: path.resolve(__dirname, './../src/less/build/'),
        },
        devtool: isProd ? undefined : 'source-map',
        mode: isProd ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.less$/i,
                    use: [
                        // {
                        //     loader: MiniCssExtractPlugin.loader,
                        // },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: true,
                            }
                        },
                    ],
                },
            ],
        },
        // optimization: {
        //     minimize:  isProd ? true : false,
        //     minimizer: [
        //       new CssMinimizerPlugin({
        //         test: /\.css$/i,
        //       }),
        //     ],
        //   },
        plugins: [new MiniCssExtractPlugin({
            filename: isProd ? "./app.min.css" : "./app.css",
        }),
        // new FixStyleOnlyEntriesPlugin(),
        ]
    }
};