import path from "path"
import LodashModuleReplacementPlugin from "lodash-webpack-plugin"
import webpack from "webpack"

const isDevelopment = global.DEBUG === true ? true : process.env.NODE_ENV !== "production"

const config = {
    mode: isDevelopment ? "development" : "production",
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            components: path.resolve(__dirname, "..", "src", "components")
        }
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx/,
                exclude: /node_modules\//,
                use: "babel-loader"
            },
            {
                test: /\.postcss/,
                exclude: /node_modules\//,
                use: [
                    "to-string-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: "inline",
                            config: {
                                path: path.resolve(__dirname, "postcss.js"),
                                ctx: {
                                    debug: isDevelopment
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.yml/,
                exclude: /node_modules\//,
                use: "yml-loader"
            },
            {
                test: new RegExp(".(jpg|png|gif|svg|ttf)$"),
                use: "url-loader?limit=5000",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: "html-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: []
}

if (!isDevelopment) {
    config.plugins.push(new LodashModuleReplacementPlugin)
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de$/)) // Only keep "de.js" and default moment.js locales
}

if (isDevelopment) {
    config.devtool = "eval-source-map"
}

module.exports = config
