import installs from "data/installs"
import removals from "data/removals"
import lodash from "lodash"

const orderedInstalls = lodash.sortBy(installs, [install => install.title.toLowerCase()])

const swappinessValues = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 96, 97, 98, 99, 100]

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
        colors: {
            type: "boolean",
            title: "Colored terminal log"
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
        },
        swappiness: {
            type: "string",
            title: "Swappiness",
            enum: [0, ...swappinessValues],
            enumNames: ["Default", ...swappinessValues.map(value => `${value}%`)],
            default: "0"
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
