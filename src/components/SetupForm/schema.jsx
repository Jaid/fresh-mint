import installs from "data/installs"
import removals from "data/removals"
import lodash from "lodash"

const orderedInstalls = lodash.orderBy(installs, ["default", install => install.title.toLowerCase()], ["desc", "asc"])

const schema = {
    title: "Setup",
    type: "object",
    properties: {
        installs: {
            type: "object",
            properties: {}
        }
    }
}

const ui = {installs: {}}

for (let install of orderedInstalls) {
    schema.properties.installs.properties[install.id] = {
        type: "boolean",
        title: install.title,
        default: install.default
    }

    ui.installs[install.id] = {
        "ui:widget": "install",
        "ui:options": {label: false}
    }
}

export default {
    schema,
    ui
}
