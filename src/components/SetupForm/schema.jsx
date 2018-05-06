import installs from "data/installs"
import removals from "data/removals"
import lodash from "lodash"

const orderedInstalls = lodash.sortBy(installs, [install => install.title.toLowerCase()])

const schema = {
    title: "Setup",
    type: "object",
    properties: {
        format: {
            type: "string",
            default: "long",
            enum: ["long", "short", "minified"],
            enumNames: ["Descriptive", "Compact (minify arguments)", "Compressed (minify code)"]
        },
        aptUpgrade: {
            type: "boolean",
            title: "Upgrade preinstalled packages"
        },
        disablePasswordPrompt: {
            type: "boolean",
            title: "Disable sudo password prompt"
        },
        installs: {
            type: "array",
            items: {
                type: "string",
                enum: orderedInstalls.map(install => install.id)
            },
            uniqueItems: true
        }
    }
}

const ui = {
    installs: {"ui:widget": "installs"}
}

/*
 * for (let install of orderedInstalls) {
 * schema.properties.installs.properties[install.id] = {
 * type: "boolean",
 * title: install.title,
 * default: install.default
 * }
 *
 * ui.installs[install.id] = {
 * "ui:widget": "install",
 * "ui:options": {label: false}
 * }
 *}
 */

export default {
    schema,
    ui
}
