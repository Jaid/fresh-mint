import React from "react"
import installs from "data/installs"
import removals from "data/removals"
import lodash from "lodash"

import InstallSwitches from "components/InstallSwitches"
import RemovalSwitches from "components/RemovalSwitches"
import StringArray from "components/StringArray"

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
    5: "5% (Recommended for large RAM)",
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
        customInstalls: {
            title: "Custom APT packages",
            type: "array",
            items: {
                type: "string",
                enum: []
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
            title: "Colored terminal output"
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
    installs: {"ui:widget": InstallSwitches},
    customInstalls: {"ui:widget": props => <StringArray newPlaceholer="New package" {...props}/>},
    removals: {"ui:widget": RemovalSwitches}
}

export default {
    schema,
    ui
}
