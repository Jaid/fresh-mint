import path from "path"
import LodashPlugin from "lodash-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"
import WebappPlugin from "webapp-webpack-plugin"
import RobotsTxtPlugin from "robotstxt-webpack-plugin"
import CnamePlugin from "cname-webpack-plugin"
import postcssOptions from "./postcss"
import webpack from "webpack"
import appDescription from "./app"

const isDevelopment = global.DEBUG === true ? true : process.env.NODE_ENV !== "production"

const postcssLoader = {
    loader: "postcss-loader",
    options: postcssOptions
}

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
        filename: isDevelopment ? "[name].dev.js" : "[chunkhash:8].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules\//,
                use: "babel-loader"
            },
            {
                test: /\.(css|postcss|scss)$/,
                use: {
                    loader: "style-loader",
                    options: {
                        hmr: isDevelopment,
                        singleton: !isDevelopment
                    }
                }
            },
            {
                test: /\.css$/, // Plain .css
                use: postcssLoader
            },
            {
                test: /\.global\.scss$/, // scss without local css-modules
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    },
                    postcssLoader,
                    "sass-loader"
                ]
            },
            {
                test: /^((?!\.?global).)*scss$/, // scss with local css-modules https://github.com/css-modules/css-modules/pull/65#issuecomment-359871109
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            modules: true, // CSS Modules https://github.com/css-modules/css-modules,
                            localIdentName: isDevelopment ? "[path][local]_[hash:base62:2]" : "[hash:base64:6]"
                        }
                    },
                    postcssLoader,
                    "sass-loader"
                ]
            },
            {
                test: /\.yml$/,
                use: "yml-loader"
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: "url-loader",
                options: {
                    limit: 4000
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: isDevelopment ? "file-loader" : [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4000,
                            name: "images/[hash:base62:6].[ext]"
                        }
                    }, "image-webpack-loader"
                ]
            },
            {
                test: /\.html$/,
                use: "html-loader"
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin,
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
    config.plugins.push(new webpack.BannerPlugin({
        banner: `${appDescription.title} v${appDescription.version}\nCrafted in Germany by Jaid - ${appDescription.authorUrl}\nBuild timestamp: ${Number(new Date)}`,
        entryOnly: true
    }))
    config.plugins.push(new RobotsTxtPlugin)
    config.plugins.push(new CnamePlugin({domain: "j4id.com"}))
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
