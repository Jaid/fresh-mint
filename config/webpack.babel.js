import path from "path"
import LodashPlugin from "lodash-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"
import WebappPlugin from "webapp-webpack-plugin"
import webpack from "webpack"
import appDescription from "./app"

const isDevelopment = global.DEBUG === true ? true : process.env.NODE_ENV !== "production"

const config = {
    mode: isDevelopment ? "development" : "production",
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            config: path.resolve(__dirname),
            components: path.resolve(__dirname, "..", "src", "components"),
            data: path.resolve(__dirname, "..", "src", "data")
        }
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules\//,
                use: "babel-loader"
            },
            {
                test: /\.postcss/, // eslint-disable-line optimize-regex/optimize-regex
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            hmr: isDevelopment
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            importLoaders: 1,
                            modules: true, // CSS Modules https://github.com/css-modules/css-modules,
                            localIdentName: isDevelopment ? "[name]_[local]_[hash:base64:4]" : undefined
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: "inline",
                            config: {
                                path: path.resolve(__dirname, "postcss.config.js"),
                                ctx: {
                                    debug: isDevelopment
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/, // eslint-disable-line optimize-regex/optimize-regex
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            hmr: isDevelopment
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: "inline",
                            config: {
                                path: path.resolve(__dirname, "postcss.config.js"),
                                ctx: {
                                    debug: isDevelopment
                                }
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/, // eslint-disable-line optimize-regex/optimize-regex
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.yml$/,
                use: "yml-loader"
            },
            {
                test: /\.(jpg|png|gif|svg|ttf|woff|woff2|eot)$/, // eslint-disable-line optimize-regex/optimize-regex
                use: "url-loader?limit=5000"
            },
            {
                test: /\.html$/,
                use: "html-loader"
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
        new HtmlPlugin({
            appDescription,
            template: `!!ejs-compiled-loader!${path.resolve(__dirname, "html.ejs")}`,
            minify: isDevelopment ? false : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeRedundantAttributes: true,
                sortAttributes: true,
                sortClassName: true,
                useShortDoctype: true
            }
        }),
        new WebappPlugin({
            logo: path.resolve(__dirname, "icon.png"),
            prefix: "icons/",
            cache: "cache/icons",
            inject: true,
            emitStats: false,
            favicons: {
                appName: appDescription.title,
                appDescription: appDescription.description,
                developerName: appDescription.authorName,
                developerURL: appDescription.authorUrl,
                version: appDescription.version,
                background: "#283c31",
                theme_color: "#adffb3",
                orientation: "portrait",
                icons: {
                    android: true,
                    appleIcon: {offset: 10},
                    appleStartup: true,
                    coast: {offset: 10},
                    favicons: true,
                    firefox: {offset: 15},
                    windows: true,
                    yandex: true
                }
            }
        })
    ],
    performance: {
        maxAssetSize: 1000000, // 1 MB
        maxEntrypointSize: 3000000 // 3 MB
    }
}

if (!isDevelopment) {
    config.plugins.push(new LodashPlugin({
        shorthands: true, // Iteratee is not a function
        flattening: true // Cannot read property 'length' of null
    }))
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de$/)) // Only keep "de.js" and default moment.js locales
}

if (isDevelopment) {
    config.devtool = "eval"
}

if (process.env.USE_WEBPACK_SERVE) {
    config.serve = { // webpack-serve config
        dev: {
            stats: {
                colors: true,
                builtAt: false,
                timings: false,
                modules: false,
                performance: false
            }
        }
    }
}

module.exports = config
