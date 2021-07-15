/*
	npm i node-sass postcss-loader@3.0.0 postcss-preset-env sass-loader css-loader cssnano mini-css-extract-plugin cross-env file-loader npm-watch webpack webpack-cli copy-webpack-plugin -D
*/

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");

const devMode = true;

module.exports = {
    mode: devMode ? "development" : "production",
    entry: [
        "./resources/js/app.js",
        "./resources/scss/app.scss",
        "./resources/images/logo.png",
        "./resources/images/bg.png",
        "./resources/images/box.png",
        "./resources/images/briefcase.png",
        "./resources/images/image.jpg",
        "./resources/images/image1.jpg",
        "./resources/images/image2.png",
        "./resources/images/image3.png",
        "./resources/images/image4.png",
        "./resources/images/image5.jpg",
        "./resources/images/life_buoy.png",
        "./resources/images/tool.png",
        "./resources/images/truck.png",
        "./resources/fonts/Mulish-Italic-VariableFont_wght.ttf",
        "./resources/fonts/Mulish-VariableFont_wght.ttf",
    ],

    output: {
        filename: "js/app.min.js",
        path: path.resolve(__dirname, "dist"),
        library: "mylib",
        libraryTarget: "var",
    },

    module: {
        rules: [
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: devMode
                                ? () => []
                                : () => [
                                      postcssPresetEnv({
                                          browsers: [">1%"],
                                      }),
                                      require("cssnano")(),
                                  ],
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./images",
                            publicPath: "../images",
                            emitFile: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./fonts",
                        // publicPath: "../fonts",
                        // emitFile: true,
                    },
                },
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "css/app.css" : "css/app.min.css",
        }),
    ],

    // watchOptions: {
    //     aggregateTimeout: 200,
    //     poll: 1000,
    // },
};
