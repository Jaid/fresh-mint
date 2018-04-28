module.exports = ({options}) => {
    const plugins = {
        "postcss-nested": null, // Resolves nested blocks
        "postcss-easings": null, // Translates some easings from http://easings.net/
        "postcss-import": null, // Inlines @import statements
        "postcss-cssnext": null, // Adds a bunch of CSS features
        "postcss-flexbugs-fixes": null // Automatically fixes common flex problems
    }

    if (options.debug) {
        Object.assign(plugins, {
            "postcss-browser-reporter": null // Displays warnings from PostCSS plugins before body
        })
    }

    if (!options.debug) {
        Object.assign(plugins, {
            "postcss-sorting": { // Sorts property names alphabetically
                order: [
                    "custom-properties",
                    "dollar-variables",
                    "declarations",
                    "rules",
                    "at-rules"
                ],
                "properties-order": [
                    "display",
                    "margin",
                    "padding"
                ],
                "unspecified-properties-position": "bottomAlphabetical"
            },
            cssnano: null
        })
    }

    return {plugins}
}
