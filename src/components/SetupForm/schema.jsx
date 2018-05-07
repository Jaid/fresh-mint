import installs from "data/installs"
import removals from "data/removals"
import lodash from "lodash"

const orderedInstalls = lodash.sortBy(installs, [install => install.title.toLowerCase()])
const orderedRemovals = lodash.sortBy(removals, [removal => removal.title.toLowerCase()])

const swappinessValues = [
    "skip",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
    "60",
    "65",
    "70",
    "75",
    "80",
    "85",
    "90",
    "95",
    "96",
    "97",
    "98",
    "99",
    "100"
]
const swapComments = {
    skip: "No changes",
    0: "0% (Do not swap)",
    1: "1% (Swap only if really necessary)",
    5: "5% (Recommended for RAM monsters)",
    10: "10% (Recommended for good PCs)",
    60: "60% (Linux Mint default)",
    100: "100% (Swap aggressively)"
}

const schema = {
    title: "Setup",
    type: "object",
    properties: {
        installs: {
            title: "Install packages",
            type: "array",
            items: {
                type: "string",
                enum: orderedInstalls.map(install => install.id)
            },
            uniqueItems: true
        },
        removals: {
            title: "Remove preinstalled packages",
            type: "array",
            items: {
                type: "string",
                enum: orderedRemovals.map(removal => removal.id)
            },
            uniqueItems: true
        },
        format: {
            title: "Code format",
            type: "string",
            default: "long",
            enum: ["long", "short", "minified"],
            enumNames: ["Descriptive", "Compact (minify arguments)", "Compressed (minify code)"]
        },
        downloadTool: {
            type: "string",
            title: "Download tool",
            default: "curl",
            enum: ["curl", "wget"],
            enumNames: ["cURL", "Wget"]
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
        swappiness: {
            type: "string",
            title: "Swappiness",
            enum: swappinessValues,
            enumNames: swappinessValues.map(value => swapComments[value] || `${value}%`),
            default: "skip"
        }
    }
}

const ui = {
    installs: {"ui:widget": "installs"},
    removals: {"ui:widget": "removals"}
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
