const isDevelopment = process.env.NODE_ENV !== "production"

const config = {}

const presets = [
    "@babel/react",
    "@babel/env",
    ["@babel/stage-1", {decoratorsLegacy: true}] // https://github.com/babel/babel/issues/7786
]

const plugins = ["@babel/transform-runtime"]

if (isDevelopment) {
    plugins.push("react-hot-loader/babel")
    // config.sourceMaps = "inline"
} else {
    plugins.push("transform-react-remove-prop-types")
    plugins.push("lodash")
    presets.push("minify")
    config.comments = false
}

Object.assign(config, {
    presets,
    plugins
})

module.exports = config
