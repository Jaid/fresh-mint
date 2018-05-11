const isDevelopment = global.DEBUG === true ? true : process.env.NODE_ENV !== "production"

const plugins = []
const addPlugin = (plugin, options) => {
    if (options) {
        plugins.push(require(plugin)(options))
    } else {
        plugins.push(require(plugin)())
    }
}

addPlugin("postcss-nested") // Resolves nested blocks
addPlugin("postcss-easings") // Translates some easings from http://easings.net/
addPlugin("postcss-import") // Inlines @import statements
addPlugin("postcss-cssnext") // Adds a bunch of CSS features
addPlugin("postcss-flexbugs-fixes") // Automatically fixes common flex problems

if (!isDevelopment) {
    addPlugin("postcss-sorting", { // Sorts property names alphabetically
        order: [
            "custom-properties",
            "dollar-variables",
            "declarations",
            "rules",
            "at-rules"
        ],
        "properties-order": [
            "content",
            "display",
            "flex",
            "width",
            "height",
            "margin",
            "padding"
        ],
        "unspecified-properties-position": "bottomAlphabetical"
    })
    addPlugin("cssnano") // Minifies output
}

exports.plugins = plugins
